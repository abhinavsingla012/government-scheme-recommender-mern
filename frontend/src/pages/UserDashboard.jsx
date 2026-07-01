/**
 * User Dashboard Page
 * Personal home for logged-in citizens: profile status, top matches, bookmarks
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";
import SchemeCard from "../components/SchemeCard";
import {
  UserCog,
  Sparkles,
  Bookmark,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  LibraryBig,
  TrendingUp,
} from "lucide-react";

const UserDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileIncomplete, setProfileIncomplete] = useState(false);
  const [topResults, setTopResults] = useState([]);
  const [eligibleCount, setEligibleCount] = useState(0);
  const [partialCount, setPartialCount] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [recRes, bmRes] = await Promise.all([
          api.get("/recommendations"),
          api.get("/profile/bookmarks"),
        ]);
        if (recRes.data.profileIncomplete) {
          setProfileIncomplete(true);
        } else {
          const results = recRes.data.results || [];
          setEligibleCount(results.filter((r) => r.eligible).length);
          setPartialCount(results.filter((r) => !r.eligible).length);
          setTopResults(results.slice(0, 3));
        }
        setBookmarks(bmRes.data.bookmarks || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const p = user?.profile || {};
  const profileFields = ["age", "gender", "occupation", "annualIncome", "education", "state", "category"];
  const filledCount = profileFields.filter((k) => p[k] != null && p[k] !== "").length;
  const profileCompletion = Math.round((filledCount / profileFields.length) * 100);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="gov-spinner" />
      </div>
    );
  }

  return (
    <div className="container-gov py-8">
      <div className="text-sm text-[#4a4a4a] mb-3">
        <Link to="/" className="gov-link">Home</Link>
        {" / "}
        <span>My Dashboard</span>
      </div>

      {/* Welcome header */}
      <div className="gov-card p-6 mb-6 bg-white border-l-4 border-l-[#ff6b00]">
        <h1 className="font-heading text-2xl md:text-3xl text-[#0d3568]">
          Namaste, {user?.name} 🙏
        </h1>
        <p className="text-[#4a4a4a] mt-1 text-sm">
          Welcome to your Yojana Sahayak dashboard. Here's what we've found for you.
        </p>
      </div>

      {profileIncomplete && (
        <div className="gov-card p-5 mb-6 border-l-4 border-l-[#b95000] bg-[#fff3e0]">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#b95000] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold text-[#b95000] mb-1">
                Please complete your profile
              </div>
              <p className="text-sm text-[#333] mb-3">
                We need your age, income, state, and category to find schemes for you.
              </p>
              <Link to="/profile" className="btn-primary text-sm !py-2 !px-4" data-testid="dashboard-complete-profile-btn">
                Complete Profile Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="gov-card p-4">
          <div className="flex items-center gap-2 text-xs uppercase font-semibold text-[#4a4a4a] mb-1">
            <UserCog className="w-3.5 h-3.5" /> Profile
          </div>
          <div className="text-2xl font-bold font-heading text-[#0d3568]">
            {profileCompletion}%
          </div>
          <div className="text-xs text-[#4a4a4a] mt-0.5">complete</div>
        </div>
        <div className="gov-card p-4">
          <div className="flex items-center gap-2 text-xs uppercase font-semibold text-[#4a4a4a] mb-1">
            <CheckCircle className="w-3.5 h-3.5" /> Eligible
          </div>
          <div className="text-2xl font-bold font-heading text-[#138808]">
            {eligibleCount}
          </div>
          <div className="text-xs text-[#4a4a4a] mt-0.5">schemes</div>
        </div>
        <div className="gov-card p-4">
          <div className="flex items-center gap-2 text-xs uppercase font-semibold text-[#4a4a4a] mb-1">
            <TrendingUp className="w-3.5 h-3.5" /> Partial
          </div>
          <div className="text-2xl font-bold font-heading text-[#ff6b00]">
            {partialCount}
          </div>
          <div className="text-xs text-[#4a4a4a] mt-0.5">matches</div>
        </div>
        <div className="gov-card p-4">
          <div className="flex items-center gap-2 text-xs uppercase font-semibold text-[#4a4a4a] mb-1">
            <Bookmark className="w-3.5 h-3.5" /> Saved
          </div>
          <div className="text-2xl font-bold font-heading text-[#0d3568]">
            {bookmarks.length}
          </div>
          <div className="text-xs text-[#4a4a4a] mt-0.5">schemes</div>
        </div>
      </div>

      {/* Top recommendations */}
      {topResults.length > 0 && (
        <div className="mb-8">
          <div className="flex items-end justify-between mb-4 flex-wrap gap-2">
            <h2 className="section-heading !mb-0 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#ff6b00]" /> Top Matches for You
            </h2>
            <Link to="/recommendations" className="gov-link text-sm" data-testid="dashboard-view-all-recs">
              View all recommendations →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topResults.map((r) => (
              <SchemeCard
                key={r.scheme._id}
                scheme={r.scheme}
                matchInfo={{ score: r.score, eligible: r.eligible }}
                testId={`dashboard-top-${r.scheme._id}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bookmarks */}
      <div className="mb-8">
        <div className="flex items-end justify-between mb-4 flex-wrap gap-2">
          <h2 className="section-heading !mb-0 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#ff6b00]" /> My Saved Schemes
          </h2>
          {bookmarks.length > 0 && (
            <Link to="/schemes" className="gov-link text-sm" data-testid="dashboard-browse-all">
              Browse more schemes →
            </Link>
          )}
        </div>
        {bookmarks.length === 0 ? (
          <div className="gov-card p-6 text-center">
            <Bookmark className="w-8 h-8 text-[#4a4a4a] mx-auto mb-2" />
            <p className="text-[#4a4a4a] mb-3 text-sm">
              You haven't saved any schemes yet. Browse and bookmark schemes to view them here.
            </p>
            <Link to="/schemes" className="btn-outline text-sm" data-testid="dashboard-explore-schemes">
              <LibraryBig className="w-4 h-4" /> Explore All Schemes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bookmarks.slice(0, 6).map((s) => (
              <SchemeCard key={s._id} scheme={s} testId={`dashboard-bookmark-${s._id}`} />
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/profile" className="gov-card p-5 flex items-center gap-3 hover:border-[#ff6b00] hover:bg-[#fff9f2] transition-colors" data-testid="dashboard-quick-profile">
          <div className="w-10 h-10 bg-[#f4f1eb] flex items-center justify-center rounded">
            <UserCog className="w-5 h-5 text-[#0d3568]" />
          </div>
          <div>
            <div className="font-semibold text-[#0d3568]">Edit Profile</div>
            <div className="text-xs text-[#4a4a4a]">Update your details</div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#ff6b00] ml-auto" />
        </Link>
        <Link to="/recommendations" className="gov-card p-5 flex items-center gap-3 hover:border-[#ff6b00] hover:bg-[#fff9f2] transition-colors" data-testid="dashboard-quick-recs">
          <div className="w-10 h-10 bg-[#f4f1eb] flex items-center justify-center rounded">
            <Sparkles className="w-5 h-5 text-[#ff6b00]" />
          </div>
          <div>
            <div className="font-semibold text-[#0d3568]">My Recommendations</div>
            <div className="text-xs text-[#4a4a4a]">All eligible schemes</div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#ff6b00] ml-auto" />
        </Link>
        <Link to="/schemes" className="gov-card p-5 flex items-center gap-3 hover:border-[#ff6b00] hover:bg-[#fff9f2] transition-colors" data-testid="dashboard-quick-browse">
          <div className="w-10 h-10 bg-[#f4f1eb] flex items-center justify-center rounded">
            <LibraryBig className="w-5 h-5 text-[#138808]" />
          </div>
          <div>
            <div className="font-semibold text-[#0d3568]">Browse Schemes</div>
            <div className="text-xs text-[#4a4a4a]">Explore full catalog</div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#ff6b00] ml-auto" />
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
