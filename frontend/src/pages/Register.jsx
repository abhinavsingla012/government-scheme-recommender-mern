/**
 * Register Page - Simple government portal style
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserPlus, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success("Account created successfully. Please complete your profile.");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-gov py-10">
      <div className="max-w-md mx-auto">
        <div className="text-sm text-[#4a4a4a] mb-3">
          <Link to="/" className="gov-link">Home</Link>
          {" / "}
          <span>Register</span>
        </div>
        <h1 className="section-heading">New Citizen Registration</h1>

        <div className="gov-card p-6 md:p-8">
          {error && (
            <div className="border border-[#ef9a9a] bg-[#fce8e8] px-3 py-2.5 rounded flex items-start gap-2 mb-4 text-sm text-[#b71c1c]" data-testid="register-error">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="gov-label">Full Name <span className="required">*</span></label>
              <input type="text" className="gov-input" placeholder="e.g. Ramesh Kumar"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required data-testid="register-name-input" />
            </div>
            <div>
              <label className="gov-label">Email Address <span className="required">*</span></label>
              <input type="email" className="gov-input" placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required data-testid="register-email-input" />
            </div>
            <div>
              <label className="gov-label">Password <span className="required">*</span></label>
              <input type="password" className="gov-input" placeholder="Minimum 6 characters"
                minLength={6} value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required data-testid="register-password-input" />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={loading} data-testid="register-submit-btn">
              <UserPlus className="w-4 h-4" />
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-[var(--gov-border)] text-sm text-[#333] text-center">
            Already registered?{" "}
            <Link to="/login" className="gov-link font-semibold" data-testid="register-to-login">
              Login here
            </Link>
          </div>
        </div>

        <p className="text-xs text-[#4a4a4a] mt-4 text-center">
          By registering, you agree to use this service for informational purposes.
          Your data will be used only to find schemes you may be eligible for.
        </p>
      </div>
    </div>
  );
};

export default Register;
