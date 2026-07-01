/**
 * Profile Page - Simple form, government-style
 */
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";
import { toast } from "sonner";
import { Save, ArrowRight, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Jammu and Kashmir", "Ladakh",
  "Puducherry", "Chandigarh", "Andaman and Nicobar Islands",
];

const OCCUPATIONS = [
  "Farmer", "Student", "Self-Employed", "Business Owner", "Entrepreneur",
  "Salaried", "Government Employee", "Unemployed", "Homemaker", "Labourer",
  "Street Vendor", "Carpenter", "Blacksmith", "Weaver", "Tailor", "Barber",
  "Cobbler", "Mason", "Goldsmith", "Potter", "Retired", "Other",
];

const EDUCATION_LEVELS = [
  "Below 10th", "10th", "12th", "Diploma", "Graduate",
  "Post-Graduate", "PhD",
];

const Profile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    age: user?.profile?.age || "",
    gender: user?.profile?.gender || "",
    occupation: user?.profile?.occupation || "",
    annualIncome: user?.profile?.annualIncome || "",
    education: user?.profile?.education || "",
    state: user?.profile?.state || "",
    district: user?.profile?.district || "",
    category: user?.profile?.category || "",
    maritalStatus: user?.profile?.maritalStatus || "",
    disability: user?.profile?.disability || false,
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        age: form.age ? Number(form.age) : null,
        annualIncome: form.annualIncome ? Number(form.annualIncome) : null,
        gender: form.gender || null,
        category: form.category || null,
      };
      const { data } = await api.put("/profile", payload);
      setUser(data.user);
      toast.success("Profile saved successfully");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container-gov py-8">
      <div className="text-sm text-[#4a4a4a] mb-3">
        <Link to="/" className="gov-link">Home</Link>
        {" / "}
        <span>My Profile</span>
      </div>

      <h1 className="section-heading">My Profile</h1>
      <p className="text-[#333] mb-5 max-w-3xl">
        Please fill in your details below. The more information you provide, the
        better we can find schemes for you. All fields are optional but recommended.
      </p>

      {/* Info note */}
      <div className="border border-[#a5cbe8] bg-[#eaf3fb] px-4 py-3 rounded flex items-start gap-2 mb-5 text-sm text-[#0d3568] max-w-3xl">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <div>
          Your personal information is used only to find schemes you are eligible
          for. It is not shared with any third party.
        </div>
      </div>

      <div className="gov-card p-6 md:p-8 max-w-4xl">
        <form onSubmit={handleSubmit}>
          {/* Section 1 */}
          <h3 className="font-heading text-lg text-[#0d3568] pb-2 mb-4 border-b border-[var(--gov-border)]">
            Personal Details
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="gov-label">Age</label>
              <input type="number" min="0" max="120" className="gov-input" value={form.age}
                onChange={(e) => handleChange("age", e.target.value)}
                placeholder="e.g. 32" data-testid="profile-age-input" />
            </div>
            <div>
              <label className="gov-label">Gender</label>
              <select className="gov-input" value={form.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                data-testid="profile-gender-select">
                <option value="">-- Select gender --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="gov-label">Marital Status</label>
              <select className="gov-input" value={form.maritalStatus}
                onChange={(e) => handleChange("maritalStatus", e.target.value)}
                data-testid="profile-marital-select">
                <option value="">-- Select --</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
                <option value="Divorced">Divorced</option>
              </select>
            </div>
            <div>
              <label className="gov-label">Category</label>
              <select className="gov-input" value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                data-testid="profile-category-select">
                <option value="">-- Select category --</option>
                <option value="General">General</option>
                <option value="OBC">OBC (Other Backward Class)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="EWS">EWS (Economically Weaker Section)</option>
              </select>
            </div>
          </div>

          {/* Section 2 */}
          <h3 className="font-heading text-lg text-[#0d3568] pb-2 mb-4 border-b border-[var(--gov-border)]">
            Occupation &amp; Income
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="gov-label">Occupation</label>
              <select className="gov-input" value={form.occupation}
                onChange={(e) => handleChange("occupation", e.target.value)}
                data-testid="profile-occupation-select">
                <option value="">-- Select occupation --</option>
                {OCCUPATIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="gov-label">Annual Household Income (₹)</label>
              <input type="number" min="0" className="gov-input" value={form.annualIncome}
                onChange={(e) => handleChange("annualIncome", e.target.value)}
                placeholder="e.g. 250000" data-testid="profile-income-input" />
            </div>
            <div>
              <label className="gov-label">Education</label>
              <select className="gov-input" value={form.education}
                onChange={(e) => handleChange("education", e.target.value)}
                data-testid="profile-education-select">
                <option value="">-- Select education --</option>
                {EDUCATION_LEVELS.map((edu) => <option key={edu} value={edu}>{edu}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer pb-2">
                <input type="checkbox" className="w-5 h-5"
                  checked={form.disability}
                  onChange={(e) => handleChange("disability", e.target.checked)}
                  data-testid="profile-disability-checkbox" />
                <span className="text-sm font-semibold text-[#333]">I have a certified disability</span>
              </label>
            </div>
          </div>

          {/* Section 3 */}
          <h3 className="font-heading text-lg text-[#0d3568] pb-2 mb-4 border-b border-[var(--gov-border)]">
            Location
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="gov-label">State</label>
              <select className="gov-input" value={form.state}
                onChange={(e) => handleChange("state", e.target.value)}
                data-testid="profile-state-select">
                <option value="">-- Select state --</option>
                {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="gov-label">District / City</label>
              <input type="text" className="gov-input" value={form.district}
                onChange={(e) => handleChange("district", e.target.value)}
                placeholder="e.g. Nagpur" data-testid="profile-district-input" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-[var(--gov-border)]">
            <button type="submit" className="btn-primary" disabled={saving} data-testid="profile-save-btn">
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Profile"}
            </button>
            <button type="button" className="btn-secondary"
              onClick={() => navigate("/recommendations")}
              data-testid="profile-view-recommendations-btn">
              View My Recommendations <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
