/**
 * SchemesBrowse Page - Simple government portal style with clear filters
 */
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../lib/api";
import SchemeCard from "../components/SchemeCard";
import { Search } from "lucide-react";

const SchemesBrowse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [schemes, setSchemes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const category = searchParams.get("category") || "all";

  useEffect(() => {
    api.get("/schemes/categories").then((res) => setCategories(res.data.categories || []));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category && category !== "all") params.category = category;
    if (search) params.search = search;
    api
      .get("/schemes", { params })
      .then((res) => setSchemes(res.data.schemes || []))
      .finally(() => setLoading(false));
  }, [category, search]);

  const handleCategory = (cat) => {
    const next = new URLSearchParams(searchParams);
    if (cat === "all") next.delete("category");
    else next.set("category", cat);
    setSearchParams(next);
  };

  return (
    <div className="container-gov py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-[#4a4a4a] mb-3">
        <Link to="/" className="gov-link">Home</Link>
        {" / "}
        <span>All Schemes</span>
      </div>

      <h1 className="section-heading">All Government Schemes</h1>
      <p className="text-[#333] mb-6 max-w-3xl">
        Browse all central government schemes. Use the search box or filter by
        category to find schemes relevant to you.
      </p>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar filters */}
        <aside className="md:col-span-1">
          <div className="gov-card p-4">
            <h3 className="font-heading text-lg text-[#0d3568] pb-2 mb-3 border-b border-[var(--gov-border)]">
              Filter by Category
            </h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => handleCategory("all")}
                  data-testid="cat-chip-all"
                  className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                    category === "all"
                      ? "bg-[#0d3568] text-white font-semibold"
                      : "text-[#333] hover:bg-[#f4f1eb]"
                  }`}
                >
                  All Categories
                </button>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <button
                    onClick={() => handleCategory(c)}
                    data-testid={`cat-chip-${c.toLowerCase().replace(/\s|&/g, "-")}`}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      category === c
                        ? "bg-[#0d3568] text-white font-semibold"
                        : "text-[#333] hover:bg-[#f4f1eb]"
                    }`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main list */}
        <div className="md:col-span-3">
          {/* Search bar */}
          <div className="relative mb-4">
            <Search className="w-4 h-4 text-[#4a4a4a] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              className="gov-input pl-10"
              placeholder="Search schemes by name or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="scheme-search-input"
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="gov-spinner" />
            </div>
          ) : schemes.length === 0 ? (
            <div className="gov-card p-8 text-center">
              <p className="text-[#4a4a4a]">No schemes found matching your search.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-[#4a4a4a] mb-3" data-testid="scheme-count">
                Showing <strong className="text-[#0d3568]">{schemes.length}</strong>{" "}
                {category !== "all" ? category : ""} scheme{schemes.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {schemes.map((s) => (
                  <SchemeCard key={s._id} scheme={s} testId={`browse-card-${s._id}`} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemesBrowse;
