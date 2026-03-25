import { useMemo } from "react";
import { COUNTRY_CONFIG } from "../lib/constants";
import CountryCard from "./CountryCard";
import FeaturedSection from "./FeaturedSection";
import ValueProps from "./ValueProps";
import StatsBar from "./StatsBar";
import Footer from "./Footer";

const STAGGER_DELAYS = [0, 1300, 2600];

export default function LandingPage({ lang, attractions, regions, onCountryClick }) {
  const destinationGroups = useMemo(() => {
    const groups = {};
    regions.forEach(region => {
      const country = region.country || "Other";
      if (!groups[country]) groups[country] = { regions: [], attractionCount: 0 };
      const count = attractions.filter(a => a.region?.slug === region.slug).length;
      groups[country].regions.push({ ...region, attractionCount: count });
      groups[country].attractionCount += count;
    });
    return groups;
  }, [regions, attractions]);

  const countryImages = useMemo(() => {
    const map = {};
    Object.keys(COUNTRY_CONFIG).forEach(country => {
      map[country] = attractions
        .filter(a => a.region?.country === country && a.cardImageUrl)
        .slice(0, 6)
        .map(a => a.cardImageUrl);
    });
    return map;
  }, [attractions]);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", padding: "48px 24px 24px" }}>
        <h1 style={{
          margin: 0, fontSize: 40, fontWeight: 900, color: "#111827",
          letterSpacing: "-0.03em"
        }}>
          AlexTravelSharing
        </h1>
        <p style={{ margin: "10px 0 0", fontSize: 17, color: "#6b7280" }}>
          {lang === "zh" ? "真實旅行故事，AI 智能規劃" : "Real travel stories, AI-powered planning"}
        </p>
      </div>

      {/* Country Cards */}
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "32px 24px 0",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 24
      }}>
        {Object.entries(COUNTRY_CONFIG).map(([countryKey, cfg], i) => (
          <CountryCard
            key={countryKey}
            countryKey={countryKey}
            config={cfg}
            images={countryImages[countryKey] || []}
            attractionCount={destinationGroups[countryKey]?.attractionCount || 0}
            lang={lang}
            onClick={() => onCountryClick(countryKey)}
            delay={STAGGER_DELAYS[i] || 0}
          />
        ))}
      </div>

      {/* Featured Attractions */}
      <div style={{ marginTop: 60 }}>
        <FeaturedSection attractions={attractions} lang={lang} onCountryClick={onCountryClick} />
      </div>

      {/* Value Props */}
      <ValueProps lang={lang} />

      {/* Stats */}
      <StatsBar attractionCount={attractions.length} lang={lang} />

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
