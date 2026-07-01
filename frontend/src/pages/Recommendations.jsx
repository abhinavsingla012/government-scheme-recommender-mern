/**
 * Recommendations Page - Simple government portal style
 */
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";
import SchemeCard from "../components/SchemeCard";
import { Link } from "react-router-dom";
import { UserCog, Info } from "lucide-react";

const Recommendations = () => {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileIncomplete, setProfileIncomplete] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api
      .get("/recommendations")
      .then((res) => {
        setResults(res.data.results || []);
        setProfileIncomplete(!!res.data.profileIncomplete);
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = results.filter((r) => {
    if (filter === "eligible") return r.eligible;
    if (filter === "partial") return !r.eligible;
    return true;
  });

  const eligibleCount = results.filter((r) => r.eligible).length;

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="gov-spinner" />
      </div>
    );
  }

  if (profileIncomplete) {
    return (
      <div className="container-gov py-10">
        <div className="max-w-2xl mx-auto gov-card p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-[#fff3e0] flex items-center justify-center mx-auto mb-4">
            <UserCog className="w-7 h-7 text-[#ff6b00]" />
          </div>
          <h2 className="font-heading text-2xl text-[#0d3568] mb-3">
            Please complete your profile first
          </h2>
          <p className="text-[#333] mb-5">
            To show schemes you are eligible for, we need your basic details -
            age, income, state, and category. Your data is used only for
            matching.
          </p>
          <Link to="/profile" className="btn-primary" data-testid="rec-goto-profile-btn">
            Complete My Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-gov py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-[#4a4a4a] mb-3">
        <Link to="/" className="gov-link">Home</Link>
        {" / "}
        <span>My Recommendations</span>
      </div>

      <h1 className="section-heading">My Recommendations</h1>
      <p className="text-[#333] mb-5">
        Personalized list of schemes for <strong>{user?.name}</strong>, based on
        the details you provided in your profile.
      </p>

      {/* Simple summary strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="gov-card p-4">
          <div className="text-xs uppercase font-semibold text-[#4a4a4a] mb-1">
            Fully Eligible Schemes
          </div>
          <div className="text-3xl font-bold text-[#138808] font-heading">{eligibleCount}</div>
        </div>
        <div className="gov-card p-4">
          <div className="text-xs uppercase font-semibold text-[#4a4a4a] mb-1">
            Partial Matches
          </div>
          <div className="text-3xl font-bold text-[#ff6b00] font-heading">
            {results.length - eligibleCount}
          </div>
        </div>
        <div className="gov-card p-4">
          <div className="text-xs uppercase font-semibold text-[#4a4a4a] mb-1">
            Total Suggested
          </div>
          <div className="text-3xl font-bold text-[#0d3568] font-heading">{results.length}</div>
        </div>
      </div>

      {/* Info note */}
      <div className="border border-[#a5cbe8] bg-[#eaf3fb] px-4 py-3 rounded flex items-start gap-2 mb-5 text-sm text-[#0d3568]">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <div>
          Schemes marked <strong>✓ Eligible</strong> are the ones you fully qualify
          for. <strong>Partial Match</strong> schemes may still apply — check the
          details page to see which criteria are not met.
        </div>
      </div>

      {/* Filter tabs - simple */}
      <div className="border-b border-[var(--gov-border)] mb-4 flex flex-wrap">
        {[
          { k: "all", label: `All (${results.length})` },
          { k: "eligible", label: `Fully Eligible (${eligibleCount})` },
          { k: "partial", label: `Partial (${results.length - eligibleCount})` },
        ].map((opt) => (
          <button
            key={opt.k}
            onClick={() => setFilter(opt.k)}
            data-testid={`rec-filter-${opt.k}`}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
              filter === opt.k
                ? "border-[#ff6b00] text-[#0d3568]"
                : "border-transparent text-[#4a4a4a] hover:text-[#0d3568]"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="gov-card p-8 text-center">
          <p className="text-[#4a4a4a]">
            No schemes in this filter. Try{" "}
            <Link to="/schemes" className="gov-link">
              browsing all schemes
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <SchemeCard
              key={r.scheme._id}
              scheme={r.scheme}
              matchInfo={{ score: r.score, eligible: r.eligible }}
              testId={`rec-card-${r.scheme._id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
