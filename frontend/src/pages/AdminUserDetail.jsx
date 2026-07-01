/**
 * Admin User Detail Page
 * Shows detailed profile of a citizen: personal info, eligible schemes, bookmarks
 */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../lib/api";
import SchemeCard from "../components/SchemeCard";
import {
  ArrowLeft,
  User as UserIcon,
  MapPin,
  Briefcase,
  Wallet,
  GraduationCap,
  CheckCircle,
  Bookmark,
  Sparkles,
  Calendar,
  Mail,
} from "lucide-react";

const InfoRow = ({ label, value }) => (
  <tr>
    <td className="!bg-[#f4f1eb] !font-semibold !w-1/3">{label}</td>
    <td>{value || <span className="text-[#4a4a4a] italic">Not provided</span>}</td>
  </tr>
);

const AdminUserDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("eligible");

  useEffect(() => {
    api
      .get(`/admin/users/${id}`)
      .then((res) => setData(res.data))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="gov-spinner" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container-gov py-10 text-center">
        <p className="text-[#4a4a4a] mb-4">User not found.</p>
        <Link to="/admin" className="btn-outline">
          <ArrowLeft className="w-4 h-4" /> Back to Admin Panel
        </Link>
      </div>
    );
  }

  const { user, eligibleSchemes, partialSchemes, bookmarks, stats } = data;
  const p = user.profile || {};

  return (
    <div className="container-gov py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-[#4a4a4a] mb-3">
        <Link to="/" className="gov-link">Home</Link>
        {" / "}
        <Link to="/admin" className="gov-link">Admin Panel</Link>
        {" / "}
        <span>{user.name}</span>
      </div>

      <Link to="/admin" className="inline-flex items-center gap-1 text-sm text-[#4a4a4a] hover:text-[#0d3568] mb-4" data-testid="admin-user-back">
        <ArrowLeft className="w-4 h-4" /> Back to all users
      </Link>

      {/* User header */}
      <div className="gov-card p-6 mb-6">
        <div className="flex flex-wrap items-start gap-4">
          <div className="w-16 h-16 bg-[#0d3568] text-white rounded-full flex items-center justify-center text-xl font-bold font-heading">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-[240px]">
            <h1 className="font-heading text-2xl text-[#0d3568]" data-testid="admin-user-name">{user.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-[#4a4a4a] mt-1">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{user.email}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Joined {new Date(user.createdAt).toLocaleDateString("en-IN")}</span>
              <span className="badge badge-eligible">Citizen</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="gov-card p-4">
          <div className="text-xs uppercase font-semibold text-[#4a4a4a] mb-1 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> Eligible Schemes
          </div>
          <div className="text-3xl font-bold font-heading text-[#138808]" data-testid="admin-user-eligible-count">{stats.eligibleCount}</div>
        </div>
        <div className="gov-card p-4">
          <div className="text-xs uppercase font-semibold text-[#4a4a4a] mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Partial Matches
          </div>
          <div className="text-3xl font-bold font-heading text-[#ff6b00]">{stats.partialCount}</div>
        </div>
        <div className="gov-card p-4">
          <div className="text-xs uppercase font-semibold text-[#4a4a4a] mb-1 flex items-center gap-1">
            <Bookmark className="w-3.5 h-3.5" /> Bookmarked
          </div>
          <div className="text-3xl font-bold font-heading text-[#0d3568]">{stats.bookmarksCount}</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile info sidebar */}
        <aside className="lg:col-span-1">
          <div className="gov-card overflow-hidden">
            <div className="bg-[#0d3568] text-white px-4 py-3">
              <h3 className="font-heading text-base flex items-center gap-2 !text-white">
                <UserIcon className="w-4 h-4" /> Profile Details
              </h3>
            </div>
            <table className="gov-table !text-sm">
              <tbody>
                <InfoRow label="Age" value={p.age ? `${p.age} years` : null} />
                <InfoRow label="Gender" value={p.gender ? p.gender.charAt(0).toUpperCase() + p.gender.slice(1) : null} />
                <InfoRow label="Category" value={p.category} />
                <InfoRow label="Marital Status" value={p.maritalStatus} />
                <InfoRow label="Disability" value={p.disability ? "Yes" : "No"} />
                <InfoRow label="Occupation" value={p.occupation} />
                <InfoRow label="Education" value={p.education} />
                <InfoRow
                  label="Annual Income"
                  value={p.annualIncome != null ? `₹${p.annualIncome.toLocaleString("en-IN")}` : null}
                />
                <InfoRow label="State" value={p.state} />
                <InfoRow label="District" value={p.district} />
              </tbody>
            </table>
          </div>

          {/* Quick highlights */}
          <div className="gov-card p-4 mt-4">
            <div className="text-xs uppercase font-semibold text-[#4a4a4a] mb-2">At a Glance</div>
            <ul className="text-sm space-y-1.5 text-[#333]">
              {p.state && <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#0d3568]" /> {p.state}{p.district ? `, ${p.district}` : ""}</li>}
              {p.occupation && <li className="flex items-center gap-2"><Briefcase className="w-3.5 h-3.5 text-[#0d3568]" /> {p.occupation}</li>}
              {p.annualIncome != null && <li className="flex items-center gap-2"><Wallet className="w-3.5 h-3.5 text-[#0d3568]" /> ₹{p.annualIncome.toLocaleString("en-IN")}/year</li>}
              {p.education && <li className="flex items-center gap-2"><GraduationCap className="w-3.5 h-3.5 text-[#0d3568]" /> {p.education}</li>}
            </ul>
          </div>
        </aside>

        {/* Schemes list */}
        <div className="lg:col-span-2">
          <div className="border-b border-[var(--gov-border)] mb-4 flex flex-wrap">
            {[
              { k: "eligible", label: `Eligible (${stats.eligibleCount})` },
              { k: "partial", label: `Partial Matches (${stats.partialCount})` },
              { k: "bookmarks", label: `Interested / Bookmarked (${stats.bookmarksCount})` },
            ].map((opt) => (
              <button
                key={opt.k}
                onClick={() => setTab(opt.k)}
                data-testid={`admin-user-tab-${opt.k}`}
                className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                  tab === opt.k
                    ? "border-[#ff6b00] text-[#0d3568]"
                    : "border-transparent text-[#4a4a4a] hover:text-[#0d3568]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {tab === "eligible" && (
            eligibleSchemes.length === 0 ? (
              <div className="gov-card p-8 text-center text-[#4a4a4a]">
                This citizen is not fully eligible for any scheme yet. Their profile may be incomplete.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eligibleSchemes.map((r) => (
                  <SchemeCard
                    key={r.scheme._id}
                    scheme={r.scheme}
                    matchInfo={{ score: r.score, eligible: r.eligible }}
                    testId={`admin-user-eligible-${r.scheme._id}`}
                  />
                ))}
              </div>
            )
          )}

          {tab === "partial" && (
            partialSchemes.length === 0 ? (
              <div className="gov-card p-8 text-center text-[#4a4a4a]">
                No partial matches (50%+) found.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {partialSchemes.map((r) => (
                  <SchemeCard
                    key={r.scheme._id}
                    scheme={r.scheme}
                    matchInfo={{ score: r.score, eligible: r.eligible }}
                    testId={`admin-user-partial-${r.scheme._id}`}
                  />
                ))}
              </div>
            )
          )}

          {tab === "bookmarks" && (
            bookmarks.length === 0 ? (
              <div className="gov-card p-8 text-center text-[#4a4a4a]">
                This citizen has not saved any schemes yet.
              </div>
            ) : (
              <>
                <p className="text-sm text-[#4a4a4a] mb-3">
                  Schemes this citizen has bookmarked / shown interest in:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookmarks.map((s) => (
                    <SchemeCard key={s._id} scheme={s} testId={`admin-user-bookmark-${s._id}`} />
                  ))}
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetail;
