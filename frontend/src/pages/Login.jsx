/**
 * Login Page - Simple government portal style
 */
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogIn, AlertCircle, Info } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success(`Welcome back, ${user.name}`);
      const from = location.state?.from?.pathname;
      navigate(from || (user.role === "admin" ? "/admin" : "/dashboard"));
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please check your details.");
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
          <span>Login</span>
        </div>
        <h1 className="section-heading">Citizen Login</h1>

        <div className="gov-card p-6 md:p-8">
          {error && (
            <div className="border border-[#ef9a9a] bg-[#fce8e8] px-3 py-2.5 rounded flex items-start gap-2 mb-4 text-sm text-[#b71c1c]" data-testid="login-error">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="gov-label">Email Address <span className="required">*</span></label>
              <input type="email" className="gov-input" placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required data-testid="login-email-input" />
            </div>
            <div>
              <label className="gov-label">Password <span className="required">*</span></label>
              <input type="password" className="gov-input" placeholder="Enter password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required data-testid="login-password-input" />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={loading} data-testid="login-submit-btn">
              <LogIn className="w-4 h-4" />
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-[var(--gov-border)] text-sm text-[#333] text-center">
            New user?{" "}
            <Link to="/register" className="gov-link font-semibold" data-testid="login-to-register">
              Register here
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
