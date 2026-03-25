import { useMemo } from "react";
import { COUNTRY_CONFIG } from "../lib/constants";
import AttractionCard from "./AttractionCard";

export default function AttractionsPage({ lang, attractions, regions, selectedCountry, selected, onToggle, regionFilter, setRegionFilter }) {
  const countryRegions = useMemo(() => {
    return regions
      .filter(r => r.country === selectedCountry)
      .map(r => ({
        ...r,
        attractionCount: attractions.filter(a => a.region?.slug === r.slug).length
      }));
  }, [regions, selectedCountry, attractions]);

  const filtered = useMemo(() => {
    const countryAttractions = attractions.filter(a => a.region?.country === selectedCountry);
    if (regionFilter === "all") return countryAttractions;
    return countryAttractions.filter(a => a.region?.slug === regionFilter);
  }, [attractions, selectedCountry, regionFilter]);

  const cfg = COUNTRY_CONFIG[selectedCountry] || { emoji: "🌍" };

  return (
    <div style={{ animation: "slideUp 0.5s ease" }}>
      {/* Title */}
      <div style={{ padding: "16px 24px 0" }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#111827", letterSpacing: "-0.03em" }}>
          {lang === "zh" ? "選擇你的夢想景點" : "Choose Your Dream Spots"}
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: 14, color: "#6b7280" }}>
          {lang === "zh" ? `已選擇 ${selected.length} 個景點` : `${selected.length} spots selected`}
        </p>
      </div>

      {/* Region filter tabs */}
      <div style={{ padding: "12px 24px", display: "flex", gap: 6, flexWrap: "wrap" }}>
        <button onClick={() => setRegionFilter("all")} style={{
          padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer",
          background: regionFilter === "all" ? "#059669" : "#f3f4f6",
          color: regionFilter === "all" ? "#fff" : "#6b7280",
          fontWeight: 600, fontSize: 13, transition: "all 0.2s"
        }}>{lang === "zh" ? "全部" : "All"}</button>
        {countryRegions.map(r => (
          <button key={r.slug} onClick={() => setRegionFilter(r.slug)} style={{
            padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer",
            background: regionFilter === r.slug ? "#059669" : "#f3f4f6",
            color: regionFilter === r.slug ? "#fff" : "#6b7280",
            fontWeight: 600, fontSize: 13, transition: "all 0.2s"
          }}>
            {cfg.emoji} {lang === "zh" ? r.nameZh : r.nameEn} ({r.attractionCount})
          </button>
        ))}
      </div>

      {/* Attraction cards grid */}
      <div style={{
        padding: "8px 24px 24px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 16
      }}>
        {filtered.map(a => (
          <AttractionCard key={a._id} item={a} lang={lang} selected={selected} onToggle={onToggle} />
        ))}
      </div>
    </div>
  );
}
