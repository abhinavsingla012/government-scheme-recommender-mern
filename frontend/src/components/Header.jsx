/**
 * Header Component - Traditional Indian government portal style
 * Layout: gov strip → tricolor line → main header (emblem + title) → nav bar
 */
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, Phone, Mail, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate("/");
  };

  const NavItem = ({ to, label, testId }) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        data-testid={testId}
        onClick={() => setMobileOpen(false)}
        className={`px-4 py-3 text-sm font-semibold border-r border-white/20 transition-colors ${
          active
            ? "bg-[#ff6b00] text-white"
            : "text-white hover:bg-white/10"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      {/* Top gov strip */}
      <div className="gov-top-strip">
        <div className="container-gov flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="font-semibold">भारत सरकार | Government of India</span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-[11px]">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" /> Helpline: 1800-11-XXXX
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" /> support@yojanasahayak.gov.in
            </span>
          </div>
        </div>
      </div>

      {/* Tricolor line */}
      <div className="gov-tricolor">
        <div /><div /><div />
      </div>

      {/* Main header */}
      <div className="bg-white border-b border-[var(--gov-border)]">
        <div className="container-gov py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3" data-testid="header-logo-link">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
              alt="Emblem of India"
              className="h-14 w-auto"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <div className="leading-tight">
              <div className="text-xs text-[#4a4a4a] font-semibold">
                Ministry of Electronics &amp; Information Technology
              </div>
              <div className="font-heading text-2xl md:text-3xl text-[#0d3568] font-bold">
                योजना सहायक <span className="text-[#4a4a4a] font-normal">|</span> Yojana Sahayak
              </div>
              <div className="text-xs text-[#4a4a4a]">
                AI-Powered Government Scheme Recommender
              </div>
            </div>
          </Link>

          {/* Login/Register desktop */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <div className="flex items-center gap-2 text-sm mr-2">
                  <div className="w-9 h-9 rounded-full bg-[#f4f1eb] border border-[var(--gov-border)] flex items-center justify-center">
                    <User className="w-4 h-4 text-[#0d3568]" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-[11px] text-[#4a4a4a]">Welcome,</div>
                    <div className="font-semibold text-[#0d3568]" data-testid="header-user-name">{user.name}</div>
                  </div>
                </div>
                <button onClick={handleLogout} className="btn-outline text-sm !py-2 !px-3" data-testid="header-logout-btn">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-outline text-sm !py-2 !px-4" data-testid="header-login-link">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm !py-2 !px-4" data-testid="header-register-link">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#0d3568] p-2"
            onClick={() => setMobileOpen((v) => !v)}
            data-testid="mobile-menu-btn"
            aria-label="Menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Navigation bar - traditional dark blue */}
      <nav className="bg-[#1a4b8c] sticky top-0 z-50 shadow-sm">
        <div className="container-gov flex flex-wrap items-stretch">
          <div className="hidden md:flex flex-wrap">
            <NavItem to="/" label="Home" testId="nav-home" />
            <NavItem to="/schemes" label="All Schemes" testId="nav-schemes" />
            {user && user.role !== "admin" && <NavItem to="/dashboard" label="Dashboard" testId="nav-dashboard" />}
            {user && user.role !== "admin" && <NavItem to="/recommendations" label="My Recommendations" testId="nav-recommendations" />}
            {user && user.role !== "admin" && <NavItem to="/profile" label="My Profile" testId="nav-profile" />}
            {user?.role === "admin" && <NavItem to="/admin" label="Admin Panel" testId="nav-admin" />}
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0d3568] border-t border-white/10">
            <div className="flex flex-col">
              <NavItem to="/" label="Home" testId="mob-nav-home" />
              <NavItem to="/schemes" label="All Schemes" testId="mob-nav-schemes" />
              {user && user.role !== "admin" && <NavItem to="/dashboard" label="Dashboard" testId="mob-nav-dashboard" />}
              {user && user.role !== "admin" && <NavItem to="/recommendations" label="My Recommendations" testId="mob-nav-recommendations" />}
              {user && user.role !== "admin" && <NavItem to="/profile" label="My Profile" testId="mob-nav-profile" />}
              {user?.role === "admin" && <NavItem to="/admin" label="Admin Panel" testId="mob-nav-admin" />}
              <div className="p-3 border-t border-white/10 flex gap-2">
                {user ? (
                  <button onClick={handleLogout} className="btn-outline text-sm w-full !bg-white" data-testid="mob-logout-btn">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="btn-outline text-sm flex-1 !bg-white text-center" data-testid="mob-login-link">
                      Login
                    </Link>
                    <Link to="/register" className="btn-primary text-sm flex-1 text-center" data-testid="mob-register-link">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
