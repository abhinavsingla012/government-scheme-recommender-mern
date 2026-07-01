/**
 * Landing Page - Simple, informational government portal style
 */
import { Link } from "react-router-dom";
import {
  Sparkles,
  Search,
  ArrowRight,
  Tractor,
  BookOpen,
  Stethoscope,
  Home as HomeIcon,
  Briefcase,
  Wallet,
  Heart,
  GraduationCap,
  CheckCircle,
  FileText,
  Users,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const CATEGORIES = [
  { name: "Agriculture", icon: Tractor },
  { name: "Education", icon: BookOpen },
  { name: "Health", icon: Stethoscope },
  { name: "Housing", icon: HomeIcon },
  { name: "Employment", icon: Briefcase },
  { name: "Financial", icon: Wallet },
  { name: "Women & Child", icon: Heart },
  { name: "Skill Development", icon: GraduationCap },
];

const Landing = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-[var(--gov-border)]">
        <div className="container-gov py-10 md:py-14">
          <div className="max-w-4xl">

            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#0d3568] leading-tight mb-4">
              Find Government Schemes You Are Eligible For
            </h1>
            <p className="text-lg text-[#333] leading-relaxed mb-6 max-w-3xl">
              Yojana Sahayak is a free online service that matches your details
              (age, income, occupation, state, category) with{" "}
              <strong>25+ Central Government schemes</strong> — including PM Kisan,
              Ayushman Bharat, PMAY, Sukanya Samriddhi, MUDRA Loan, and many more.
              Register once, complete your profile, and see all the benefits meant
              for you.
            </p>
            <div className="flex flex-wrap gap-3">
              {user ? (
                <Link to="/dashboard" className="btn-primary" data-testid="hero-cta-recommendations">
                  Go to My Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link to="/register" className="btn-primary" data-testid="hero-cta-register">
                  Register Now — It's Free
                </Link>
              )}
              <Link to="/schemes" className="btn-outline" data-testid="hero-cta-browse">
                View All Schemes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick info stats - simple horizontal strip */}
      <section className="bg-[#f4f1eb] border-b border-[var(--gov-border)]">
        <div className="container-gov py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="border-r border-[var(--gov-border)] last:border-r-0">
            <div className="text-3xl font-bold text-[#0d3568] font-heading">25+</div>
            <div className="text-xs uppercase text-[#4a4a4a] font-semibold tracking-wide">Schemes Listed</div>
          </div>
          <div className="border-r border-[var(--gov-border)] last:border-r-0">
            <div className="text-3xl font-bold text-[#0d3568] font-heading">12</div>
            <div className="text-xs uppercase text-[#4a4a4a] font-semibold tracking-wide">Categories</div>
          </div>
          <div className="md:border-r border-[var(--gov-border)] last:border-r-0">
            <div className="text-3xl font-bold text-[#0d3568] font-heading">Free</div>
            <div className="text-xs uppercase text-[#4a4a4a] font-semibold tracking-wide">Service</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#0d3568] font-heading">100%</div>
            <div className="text-xs uppercase text-[#4a4a4a] font-semibold tracking-wide">Verified Data</div>
          </div>
        </div>
      </section>

      {/* How it works - simple numbered steps */}
      <section className="container-gov py-10">
        <h2 className="section-heading">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              n: 1,
              title: "Register & Create Profile",
              desc: "Sign up with your email and fill in basic details — age, gender, occupation, income, state, and category. Takes 2 minutes.",
              icon: Users,
            },
            {
              n: 2,
              title: "Get Matched Schemes",
              desc: "Our system checks your details against eligibility rules of each scheme and shows you a personalized list ranked by match.",
              icon: Search,
            },
            {
              n: 3,
              title: "Apply on Official Portal",
              desc: "For each scheme you see full benefits, required documents, and a direct link to the official government application page.",
              icon: FileText,
            },
          ].map(({ n, title, desc, icon: Icon }) => (
            <div key={n} className="gov-card p-6 flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#0d3568] text-white flex items-center justify-center font-bold text-xl font-heading rounded">
                  {n}
                </div>
              </div>
              <div>
                <h3 className="font-heading text-lg text-[#0d3568] mb-2 flex items-center gap-2">
                  <Icon className="w-5 h-5 text-[#ff6b00]" /> {title}
                </h3>
                <p className="text-sm text-[#333] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories - simple grid */}
      <section className="bg-white border-y border-[var(--gov-border)]">
        <div className="container-gov py-10">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
            <h2 className="section-heading !mb-0">Browse by Category</h2>
            <Link to="/schemes" className="gov-link text-sm" data-testid="cat-view-all">
              View all schemes →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CATEGORIES.map(({ name, icon: Icon }) => (
              <Link
                key={name}
                to={`/schemes?category=${encodeURIComponent(name)}`}
                data-testid={`landing-cat-${name.toLowerCase().replace(/\s|&/g, "-")}`}
                className="gov-card p-4 flex items-center gap-3 hover:border-[#ff6b00] hover:bg-[#fff9f2] transition-colors"
              >
                <div className="w-10 h-10 bg-[#f4f1eb] flex items-center justify-center rounded">
                  <Icon className="w-5 h-5 text-[#0d3568]" strokeWidth={1.8} />
                </div>
                <div className="font-semibold text-[#0d3568] text-sm">{name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured schemes - simple list with dots */}
      <section className="container-gov py-10">
        <h2 className="section-heading">Popular Schemes</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: "PM Kisan Samman Nidhi", desc: "₹6,000 per year income support for farmer families." },
            { name: "Ayushman Bharat - PMJAY", desc: "Health cover of ₹5 lakh per family per year." },
            { name: "Pradhan Mantri Awas Yojana", desc: "Affordable housing with interest subsidy for urban poor." },
            { name: "Sukanya Samriddhi Yojana", desc: "Savings scheme for the girl child with 8.2% interest." },
            { name: "PM MUDRA Yojana", desc: "Collateral-free loans up to ₹10 lakh for small businesses." },
            { name: "PM Ujjwala Yojana", desc: "Free LPG connection for women from BPL households." },
          ].map((s) => (
            <Link
              key={s.name}
              to="/schemes"
              className="gov-card p-4 flex items-start gap-3 hover:border-[#ff6b00] hover:bg-[#fff9f2] transition-colors"
            >
              <CheckCircle className="w-5 h-5 text-[#138808] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[#0d3568]">{s.name}</div>
                <div className="text-sm text-[#4a4a4a]">{s.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <Link to="/schemes" className="gov-link" data-testid="landing-view-all-schemes">
            View all 25+ schemes →
          </Link>
        </div>
      </section>

      {/* Bottom CTA - simple */}
      <section className="bg-[#0d3568] text-white">
        <div className="container-gov py-10 md:py-14 text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-white mb-3">
            Don't miss the benefits meant for you
          </h2>
          <p className="text-white/85 max-w-2xl mx-auto mb-6">
            Thousands of citizens miss out on schemes simply because they don't
            know about them. Register today and check your eligibility in
            minutes.
          </p>
          {user ? (
            <Link to="/dashboard" className="btn-primary" data-testid="cta-bottom-recommendations">
              Go to My Dashboard
            </Link>
          ) : (
            <Link to="/register" className="btn-primary" data-testid="cta-bottom-register">
              Create Your Free Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Landing;
