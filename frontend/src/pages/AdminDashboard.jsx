/**
 * AdminDashboard Page - Simple government portal style
 */
import { useEffect, useState } from "react";
import api from "../lib/api";
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router-dom";
import {
  Users,
  ClipboardList,
  Plus,
  Pencil,
  Trash2,
  X,
  Eye,
  CheckCircle,
} from "lucide-react";

const emptyScheme = () => ({
  name: "",
  ministry: "Government of India",
  category: "Other",
  shortDescription: "",
  description: "",
  benefits: "",
  eligibilityText: "",
  documentsRequired: "",
  applicationProcess: "",
  applicationUrl: "",
  deadline: "Ongoing",
  launchYear: "",
  isActive: true,
  minAge: "",
  maxAge: "",
  maxIncome: "",
  gender: "",
  states: "",
  categories: "",
  occupations: "",
});

const CATEGORIES = [
  "Agriculture", "Education", "Health", "Housing", "Employment",
  "Financial", "Women & Child", "Social Welfare", "Skill Development",
  "Senior Citizen", "Rural Development", "Other",
];

const AdminDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "users" ? "users" : "schemes";
  const [stats, setStats] = useState(null);
  const [schemes, setSchemes] = useState([]);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState(initialTab);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyScheme());
  const [saving, setSaving] = useState(false);

  const changeTab = (t) => {
    setTab(t);
    const next = new URLSearchParams(searchParams);
    if (t === "users") next.set("tab", "users");
    else next.delete("tab");
    setSearchParams(next, { replace: true });
  };

  const loadAll = async () => {
    const [statsRes, schemesRes, usersRes] = await Promise.all([
      api.get("/admin/stats"),
      api.get("/schemes?limit=200"),
      api.get("/admin/users"),
    ]);
    setStats(statsRes.data);
    setSchemes(schemesRes.data.schemes);
    setUsers(usersRes.data.users);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyScheme());
    setShowForm(true);
  };

  const openEdit = (s) => {
    setEditing(s);
    setForm({
      ...s,
      benefits: (s.benefits || []).join("\n"),
      documentsRequired: (s.documentsRequired || []).join("\n"),
      minAge: s.eligibility?.minAge ?? "",
      maxAge: s.eligibility?.maxAge ?? "",
      maxIncome: s.eligibility?.maxIncome ?? "",
      gender: (s.eligibility?.gender || []).join(","),
      states: (s.eligibility?.states || []).join(","),
      categories: (s.eligibility?.categories || []).join(","),
      occupations: (s.eligibility?.occupations || []).join(","),
      launchYear: s.launchYear || "",
    });
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const parseList = (s) =>
        s ? s.split(/[,\n]/).map((x) => x.trim()).filter(Boolean) : [];
      const payload = {
        name: form.name,
        ministry: form.ministry,
        category: form.category,
        shortDescription: form.shortDescription,
        description: form.description,
        benefits: parseList(form.benefits),
        eligibilityText: form.eligibilityText,
        documentsRequired: parseList(form.documentsRequired),
        applicationProcess: form.applicationProcess,
        applicationUrl: form.applicationUrl,
        deadline: form.deadline,
        launchYear: form.launchYear ? Number(form.launchYear) : null,
        isActive: !!form.isActive,
        eligibility: {
          minAge: form.minAge ? Number(form.minAge) : null,
          maxAge: form.maxAge ? Number(form.maxAge) : null,
          maxIncome: form.maxIncome ? Number(form.maxIncome) : null,
          gender: parseList(form.gender),
          states: parseList(form.states),
          categories: parseList(form.categories),
          occupations: parseList(form.occupations),
        },
      };
      if (editing) {
        await api.put(`/admin/schemes/${editing._id}`, payload);
        toast.success("Scheme updated");
      } else {
        await api.post("/admin/schemes", payload);
        toast.success("Scheme created");
      }
      setShowForm(false);
      loadAll();
    } catch (err) {
      toast.error(err.response?.data?.error || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this scheme? This action cannot be undone.")) return;
    try {
      await api.delete(`/admin/schemes/${id}`);
      toast.success("Scheme deleted");
      loadAll();
    } catch (err) {
      toast.error(err.response?.data?.error || "Delete failed");
    }
  };

  return (
    <div className="container-gov py-8">
      <div className="text-sm text-[#4a4a4a] mb-3">
        <Link to="/" className="gov-link">Home</Link>
        {" / "}
        <span>Admin Panel</span>
      </div>

      <h1 className="section-heading">Administrator Panel</h1>
      <p className="text-[#333] mb-5">
        Manage government schemes and view registered citizens.
      </p>

      {/* Simple stats row */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="gov-card p-4">
            <div className="text-xs uppercase font-semibold text-[#4a4a4a] mb-1">Total Schemes</div>
            <div className="text-2xl font-bold font-heading text-[#0d3568]">{stats.totalSchemes}</div>
          </div>
          <div className="gov-card p-4">
            <div className="text-xs uppercase font-semibold text-[#4a4a4a] mb-1">Active Schemes</div>
            <div className="text-2xl font-bold font-heading text-[#138808]">{stats.activeSchemes}</div>
          </div>
          <div className="gov-card p-4">
            <div className="text-xs uppercase font-semibold text-[#4a4a4a] mb-1">Registered Users</div>
            <div className="text-2xl font-bold font-heading text-[#0d3568]">{stats.totalUsers}</div>
          </div>
          <div className="gov-card p-4">
            <div className="text-xs uppercase font-semibold text-[#4a4a4a] mb-1">Categories</div>
            <div className="text-2xl font-bold font-heading text-[#0d3568]">{stats.categoryBreakdown?.length || 0}</div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-[var(--gov-border)] mb-4 flex">
        {[
          { k: "schemes", label: "Manage Schemes", icon: ClipboardList },
          { k: "users", label: "Users Data", icon: Users },
        ].map(({ k, label, icon: Icon }) => (
          <button
            key={k}
            onClick={() => changeTab(k)}
            data-testid={`admin-tab-${k}`}
            className={`px-4 py-2.5 text-sm font-semibold flex items-center gap-2 border-b-2 -mb-px transition-colors ${
              tab === k
                ? "border-[#ff6b00] text-[#0d3568]"
                : "border-transparent text-[#4a4a4a] hover:text-[#0d3568]"
            }`}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      {tab === "schemes" && (
        <>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <p className="text-sm text-[#4a4a4a]">
              Total <strong className="text-[#0d3568]">{schemes.length}</strong> schemes listed
            </p>
            <button className="btn-primary" onClick={openCreate} data-testid="admin-add-scheme-btn">
              <Plus className="w-4 h-4" /> Add New Scheme
            </button>
          </div>

          <div className="gov-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Scheme Name</th>
                    <th>Category</th>
                    <th>Ministry</th>
                    <th className="!text-center">Status</th>
                    <th className="!text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schemes.map((s) => (
                    <tr key={s._id}>
                      <td className="font-semibold text-[#0d3568]">{s.name}</td>
                      <td>{s.category}</td>
                      <td className="text-xs text-[#4a4a4a]">{s.ministry}</td>
                      <td className="text-center">
                        <span className={`badge ${s.isActive ? "badge-eligible" : "badge-low"}`}>
                          {s.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="text-right">
                        <div className="inline-flex gap-1">
                          <button
                            onClick={() => openEdit(s)}
                            data-testid={`admin-edit-${s._id}`}
                            className="p-1.5 border border-[var(--gov-border)] rounded hover:bg-[#f4f1eb] text-[#0d3568]"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(s._id)}
                            data-testid={`admin-delete-${s._id}`}
                            className="p-1.5 border border-[#ef9a9a] rounded hover:bg-[#fce8e8] text-[#b71c1c]"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === "users" && (
        <div>
          <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-[#4a4a4a]">
              Total <strong className="text-[#0d3568]">{users.length}</strong> registered citizens.
              Click <strong>View Data</strong> to see their eligible schemes and interests.
            </p>
          </div>
          <div className="gov-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Location</th>
                    <th>Category</th>
                    <th>Occupation</th>
                    <th className="!text-center">Eligible</th>
                    <th className="!text-center">Interested</th>
                    <th className="!text-center">Profile</th>
                    <th className="!text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="9" className="text-center py-6 text-[#4a4a4a]">No citizens registered yet.</td>
                    </tr>
                  )}
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td className="font-semibold text-[#0d3568]">{u.name}</td>
                      <td className="text-xs">{u.email}</td>
                      <td>{u.profile?.state || <span className="text-[#4a4a4a] italic">—</span>}</td>
                      <td>{u.profile?.category || <span className="text-[#4a4a4a] italic">—</span>}</td>
                      <td>{u.profile?.occupation || <span className="text-[#4a4a4a] italic">—</span>}</td>
                      <td className="text-center">
                        <span className="inline-flex items-center gap-1 font-bold text-[#138808]">
                          <CheckCircle className="w-3.5 h-3.5" /> {u.eligibleCount}
                        </span>
                      </td>
                      <td className="text-center font-semibold text-[#0d3568]">
                        {u.bookmarksCount}
                      </td>
                      <td className="text-center">
                        <span className={`badge ${u.profileComplete ? "badge-eligible" : "badge-partial"}`}>
                          {u.profileComplete ? "Complete" : "Incomplete"}
                        </span>
                      </td>
                      <td className="text-right">
                        <Link
                          to={`/admin/users/${u._id}`}
                          data-testid={`admin-view-user-${u._id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#0d3568] rounded text-xs font-semibold text-[#0d3568] hover:bg-[#0d3568] hover:text-white transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> View Data
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded w-full max-w-3xl my-8 shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-[var(--gov-border)] bg-[#0d3568] rounded-t text-white sticky top-0">
              <h3 className="font-heading text-lg !text-white">
                {editing ? "Edit Scheme" : "Add New Scheme"}
              </h3>
              <button onClick={() => setShowForm(false)} data-testid="admin-form-close-btn" className="text-white hover:text-[#ff6b00]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="gov-label">Scheme Name <span className="required">*</span></label>
                  <input required className="gov-input" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    data-testid="admin-form-name" />
                </div>
                <div>
                  <label className="gov-label">Category <span className="required">*</span></label>
                  <select className="gov-input" value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="gov-label">Ministry</label>
                  <input className="gov-input" value={form.ministry}
                    onChange={(e) => setForm({ ...form, ministry: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className="gov-label">Short Description <span className="required">*</span></label>
                  <input required className="gov-input" value={form.shortDescription}
                    onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className="gov-label">Full Description <span className="required">*</span></label>
                  <textarea required rows="3" className="gov-input" value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className="gov-label">Benefits (one per line)</label>
                  <textarea rows="3" className="gov-input" value={form.benefits}
                    onChange={(e) => setForm({ ...form, benefits: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className="gov-label">Eligibility Text</label>
                  <textarea rows="2" className="gov-input" value={form.eligibilityText}
                    onChange={(e) => setForm({ ...form, eligibilityText: e.target.value })} />
                </div>

                <div><label className="gov-label">Min Age</label>
                  <input type="number" className="gov-input" value={form.minAge} onChange={(e) => setForm({ ...form, minAge: e.target.value })} />
                </div>
                <div><label className="gov-label">Max Age</label>
                  <input type="number" className="gov-input" value={form.maxAge} onChange={(e) => setForm({ ...form, maxAge: e.target.value })} />
                </div>
                <div><label className="gov-label">Max Annual Income (₹)</label>
                  <input type="number" className="gov-input" value={form.maxIncome} onChange={(e) => setForm({ ...form, maxIncome: e.target.value })} />
                </div>
                <div><label className="gov-label">Gender (comma: male,female)</label>
                  <input className="gov-input" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} />
                </div>
                <div><label className="gov-label">Categories (SC,ST,OBC,EWS,General)</label>
                  <input className="gov-input" value={form.categories} onChange={(e) => setForm({ ...form, categories: e.target.value })} />
                </div>
                <div><label className="gov-label">Occupations (comma-separated)</label>
                  <input className="gov-input" value={form.occupations} onChange={(e) => setForm({ ...form, occupations: e.target.value })} />
                </div>
                <div className="md:col-span-2"><label className="gov-label">States (comma-separated, blank = all)</label>
                  <input className="gov-input" value={form.states} onChange={(e) => setForm({ ...form, states: e.target.value })} />
                </div>

                <div className="md:col-span-2"><label className="gov-label">Documents Required (one per line)</label>
                  <textarea rows="2" className="gov-input" value={form.documentsRequired} onChange={(e) => setForm({ ...form, documentsRequired: e.target.value })} />
                </div>
                <div className="md:col-span-2"><label className="gov-label">Application Process</label>
                  <textarea rows="2" className="gov-input" value={form.applicationProcess} onChange={(e) => setForm({ ...form, applicationProcess: e.target.value })} />
                </div>
                <div><label className="gov-label">Application URL</label>
                  <input className="gov-input" value={form.applicationUrl} onChange={(e) => setForm({ ...form, applicationUrl: e.target.value })} />
                </div>
                <div><label className="gov-label">Deadline</label>
                  <input className="gov-input" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
                </div>
                <div><label className="gov-label">Launch Year</label>
                  <input type="number" className="gov-input" value={form.launchYear} onChange={(e) => setForm({ ...form, launchYear: e.target.value })} />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4" />
                    <span className="text-sm font-semibold text-[#333]">Active</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--gov-border)]">
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline">Cancel</button>
                <button type="submit" className="btn-primary" disabled={saving} data-testid="admin-form-submit">
                  {saving ? "Saving..." : editing ? "Update Scheme" : "Add Scheme"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
