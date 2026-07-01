/**
 * SchemeCard Component - Simple bordered card, government style
 */
import { Link } from "react-router-dom";
import {
  BookOpen,
  Stethoscope,
  Home as HomeIcon,
  Tractor,
  Landmark,
  Briefcase,
  Users,
  GraduationCap,
  Heart,
  Wallet,
  ArrowRight,
} from "lucide-react";

const CATEGORY_ICON = {
  Agriculture: Tractor,
  Education: BookOpen,
  Health: Stethoscope,
  Housing: HomeIcon,
  Employment: Briefcase,
  Financial: Wallet,
  "Women & Child": Heart,
  "Social Welfare": Users,
  "Skill Development": GraduationCap,
  "Senior Citizen": Users,
  "Rural Development": Landmark,
  Other: Landmark,
};

const MatchBadge = ({ score, eligible }) => {
  const cls = eligible ? "badge-eligible" : score >= 50 ? "badge-partial" : "badge-low";
  const label = eligible ? "✓ Eligible" : `${score}% Match`;
  return <span className={`badge ${cls}`}>{label}</span>;
};

const SchemeCard = ({ scheme, matchInfo, testId }) => {
  const Icon = CATEGORY_ICON[scheme.category] || Landmark;

  return (
    <Link
      to={`/schemes/${scheme._id}`}
      data-testid={testId || `scheme-card-${scheme._id}`}
      className="gov-card p-5 flex flex-col h-full hover:border-[#ff6b00] hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#f4f1eb] flex items-center justify-center rounded flex-shrink-0">
            <Icon className="w-4 h-4 text-[#0d3568]" strokeWidth={1.8} />
          </div>
          <div className="text-xs font-semibold uppercase text-[#4a4a4a]">
            {scheme.category}
          </div>
        </div>
        {matchInfo && <MatchBadge score={matchInfo.score} eligible={matchInfo.eligible} />}
      </div>

      <h3 className="font-heading text-lg text-[#0d3568] leading-snug mb-2">
        {scheme.name}
      </h3>
      <p className="text-sm text-[#333] leading-relaxed flex-grow mb-3">
        {scheme.shortDescription}
      </p>

      <div className="mt-auto pt-3 border-t border-[var(--gov-border)] flex items-center justify-between text-sm">
        <span className="text-xs text-[#4a4a4a] truncate max-w-[65%]">
          {scheme.ministry}
        </span>
        <span className="text-[#ff6b00] font-semibold flex items-center gap-1">
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
};

export default SchemeCard;
