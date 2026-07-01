/**
 * SchemeDetail Page - Simple, information-rich government portal style
 */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import {
  CheckCircle,
  XCircle,
  FileText,
  Calendar,
  ExternalLink,
  ArrowLeft,
  ClipboardList,
  Info,
} from "lucide-react";

const SchemeDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [matchInfo, setMatchInfo] = useState(null);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/schemes/${id}`)
      .then((res) => setScheme(res.data.scheme))
      .catch(() => setScheme(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!user) return;
    api
      .get("/recommendations")
      .then((res) => {
        const found = (res.data.results || []).find((r) => r.scheme._id === id);
        if (found) setMatchInfo(found);
      })
      .catch(() => {});
  }, [id, user]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="gov-spinner" />
      </div>
    );
  }
  if (!scheme) {
    return (
      <div className="container-gov py-16 text-center">
        <p className="text-[#4a4a4a] mb-4">Scheme not found.</p>
        <Link to="/schemes" className="btn-outline">
          <ArrowLeft className="w-4 h-4" /> Back to all schemes
        </Link>
      </div>
    );
  }

  const el = scheme.eligibility || {};

  return (
    <div className="container-gov py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-[#4a4a4a] mb-3">
        <Link to="/" className="gov-link">Home</Link>
        {" / "}
        <Link to="/schemes" className="gov-link">All Schemes</Link>
        {" / "}
        <span className="text-[#0d3568]">{scheme.name}</span>
      </div>

      {/* Scheme header */}
      <div className="gov-card p-6 md:p-8 mb-6">
        <div className="flex flex-wrap items-start gap-4 justify-between">
          <div className="flex-1 min-w-[280px]">
            <div className="text-xs uppercase font-semibold text-[#4a4a4a] mb-1">
              {scheme.category} {scheme.launchYear ? `• Launched ${scheme.launchYear}` : ""}
            </div>
            <h1 className="font-heading text-2xl md:text-3xl text-[#0d3568] leading-tight mb-2">
              {scheme.name}
            </h1>
            <div className="text-sm text-[#4a4a4a]">{scheme.ministry}</div>
          </div>
          {matchInfo && (
            <div className={`border-l-4 pl-4 py-2 ${matchInfo.eligible ? "border-[#138808] bg-[#e8f5e9]" : "border-[#ff6b00] bg-[#fff3e0]"}`}>
              <div className="text-xs uppercase font-semibold text-[#4a4a4a]">Your Match</div>
              <div className={`text-2xl font-bold font-heading ${matchInfo.eligible ? "text-[#138808]" : "text-[#ff6b00]"}`}>
                {matchInfo.score}%
              </div>
              <div className={`text-sm font-semibold ${matchInfo.eligible ? "text-[#138808]" : "text-[#b95000]"}`}>
                {matchInfo.eligible ? "You are eligible" : "Partial match"}
              </div>
            </div>
          )}
        </div>

        <p className="text-[#333] leading-relaxed mt-5 text-base">
          {scheme.description}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Benefits */}
          {scheme.benefits?.length > 0 && (
            <div className="gov-card p-6">
              <h2 className="font-heading text-xl text-[#0d3568] mb-3 pb-2 border-b border-[var(--gov-border)] flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#138808]" /> Key Benefits
              </h2>
              <ul className="space-y-2">
                {scheme.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#333]">
                    <span className="text-[#ff6b00] font-bold flex-shrink-0 mt-1">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Eligibility */}
          <div className="gov-card p-6">
            <h2 className="font-heading text-xl text-[#0d3568] mb-3 pb-2 border-b border-[var(--gov-border)] flex items-center gap-2">
              <Info className="w-5 h-5 text-[#0d3568]" /> Eligibility Criteria
            </h2>
            <p className="text-[#333] mb-4">{scheme.eligibilityText}</p>

            <table className="gov-table !text-[14px]">
              <tbody>
                {(el.minAge != null || el.maxAge != null) && (
                  <tr>
                    <td className="!bg-[#f4f1eb] !font-semibold !w-1/3">Age Range</td>
                    <td>{el.minAge || 0} - {el.maxAge || "No upper limit"} years</td>
                  </tr>
                )}
                {el.maxIncome != null && (
                  <tr>
                    <td className="!bg-[#f4f1eb] !font-semibold">Max Annual Income</td>
                    <td>₹{el.maxIncome.toLocaleString("en-IN")}</td>
                  </tr>
                )}
                {el.gender?.length > 0 && (
                  <tr>
                    <td className="!bg-[#f4f1eb] !font-semibold">Gender</td>
                    <td className="capitalize">{el.gender.join(", ")}</td>
                  </tr>
                )}
                {el.categories?.length > 0 && (
                  <tr>
                    <td className="!bg-[#f4f1eb] !font-semibold">Category</td>
                    <td>{el.categories.join(", ")}</td>
                  </tr>
                )}
                {el.occupations?.length > 0 && (
                  <tr>
                    <td className="!bg-[#f4f1eb] !font-semibold">Occupation</td>
                    <td>{el.occupations.join(", ")}</td>
                  </tr>
                )}
                {el.states?.length > 0 && (
                  <tr>
                    <td className="!bg-[#f4f1eb] !font-semibold">Applicable States</td>
                    <td>{el.states.join(", ")}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Documents */}
          {scheme.documentsRequired?.length > 0 && (
            <div className="gov-card p-6">
              <h2 className="font-heading text-xl text-[#0d3568] mb-3 pb-2 border-b border-[var(--gov-border)] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#ff6b00]" /> Documents Required
              </h2>
              <ol className="list-decimal list-inside space-y-1.5 text-[#333]">
                {scheme.documentsRequired.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ol>
            </div>
          )}

          {/* How to apply */}
          {scheme.applicationProcess && (
            <div className="gov-card p-6">
              <h2 className="font-heading text-xl text-[#0d3568] mb-3 pb-2 border-b border-[var(--gov-border)] flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-[#138808]" /> How to Apply
              </h2>
              <p className="text-[#333] leading-relaxed">
                {scheme.applicationProcess}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="gov-card p-5">
            <div className="text-xs uppercase font-semibold text-[#4a4a4a] mb-2">Quick Info</div>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-1.5 font-semibold text-[#4a4a4a]">
                    <Calendar className="w-3.5 h-3.5 inline mr-1" /> Deadline
                  </td>
                  <td className="py-1.5 text-right">{scheme.deadline}</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-semibold text-[#4a4a4a]">Status</td>
                  <td className="py-1.5 text-right">
                    <span className={`badge ${scheme.isActive ? "badge-eligible" : "badge-low"}`}>
                      {scheme.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            {scheme.applicationUrl && (
              <a
                href={scheme.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full mt-4"
                data-testid="detail-apply-btn"
              >
                Apply on Official Portal <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <p className="text-xs text-[#4a4a4a] mt-3 leading-relaxed">
              You will be redirected to the official government website.
            </p>
          </div>

          {/* Match details */}
          {matchInfo && (
            <div className="gov-card p-5">
              <div className="text-xs uppercase font-semibold text-[#4a4a4a] mb-3">Match Details</div>
              {matchInfo.matched?.length > 0 && (
                <div className="mb-3">
                  <div className="text-sm font-semibold text-[#138808] mb-1">Criteria you meet:</div>
                  <ul className="space-y-1">
                    {matchInfo.matched.map((m, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-[#333]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#138808] mt-0.5 flex-shrink-0" /> {m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {matchInfo.missing?.length > 0 && (
                <div>
                  <div className="text-sm font-semibold text-[#b71c1c] mb-1">Criteria not met:</div>
                  <ul className="space-y-1">
                    {matchInfo.missing.map((m, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-[#333]">
                        <XCircle className="w-3.5 h-3.5 text-[#b71c1c] mt-0.5 flex-shrink-0" /> {m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {!user && (
            <div className="gov-card p-5 bg-[#fff9f2] border-[#ffcc80]">
              <div className="font-semibold text-[#0d3568] mb-1">
                Want personalized matching?
              </div>
              <p className="text-sm text-[#333] mb-3">
                Register to see if you are eligible for this scheme.
              </p>
              <Link to="/register" className="btn-primary text-sm w-full" data-testid="detail-register-cta">
                Register Free
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default SchemeDetail;
