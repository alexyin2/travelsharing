import { useMemo } from "react";
import { COUNTRY_CONFIG, COUNTRY_ORDER } from "../lib/constants";
import CountryCard from "./CountryCard";
import FeaturedSection from "./FeaturedSection";
import Footer from "./Footer";
import ProductShot from "./ProductShot";
import SectionIntro from "./SectionIntro";
import StatsBar from "./StatsBar";
import ValueProps from "./ValueProps";

export default function LandingPage({ lang, attractions, regions, onCountryClick }) {
  const destinationGroups = useMemo(() => {
    const groups = {};
    regions.forEach((region) => {
      const country = region.country;
      if (!country) return;
      if (!groups[country]) groups[country] = { regionCount: 0, attractionCount: 0 };
      groups[country].regionCount += 1;
    });

    attractions.forEach((attraction) => {
      const country = attraction.region?.country;
      if (!country) return;
      if (!groups[country]) groups[country] = { regionCount: 0, attractionCount: 0 };
      groups[country].attractionCount += 1;
    });

    return groups;
  }, [regions, attractions]);

  const featuredPreview = useMemo(() => {
    return attractions.slice(0, 5).map((item) => ({
      name: lang === "zh" ? item.nameZh : item.nameEn,
      country: item.region?.country,
    }));
  }, [attractions, lang]);

  return (
    <div className="landing-page">
      <section className="canvas-section hero-section">
        <div className="page-container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              {lang === "zh" ? "旅程策展 / AI 行程規劃" : "Editorial travel / AI itinerary studio"}
            </p>
            <h1 className="hero-title">
              {lang === "zh"
                ? "把真實旅行故事，整理成可以直接出發的路線。"
                : "Turn firsthand travel stories into routes you can actually take."}
            </h1>
            <div className="hero-sidecopy">
              <p className="lead">
                {lang === "zh"
                  ? "從挪威峽灣、倫敦街區到紐西蘭南島，AlexTravelSharing 把作者的實際經驗、景點篩選與 AI 行程編排整合成一個更有節奏的旅行入口。"
                  : "From Norwegian fjords to London streets and New Zealand drives, AlexTravelSharing blends firsthand notes, destination curation, and AI itinerary planning into one polished travel workflow."}
              </p>
              <div className="hero-actions">
                <button className="button-shell button-shell--accent" onClick={() => onCountryClick("Norway")} type="button">
                  <span className="pill-button pill-button--accent">
                    {lang === "zh" ? "開始規劃旅程" : "Start Planning"}
                  </span>
                </button>
                <button
                  className="button-shell button-shell--ring"
                  onClick={() => document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" })}
                  type="button"
                >
                  <span className="pill-button pill-button--ghost">
                    {lang === "zh" ? "瀏覽目的地" : "Browse Destinations"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="screenshot-well screenshot-well--hero">
              <ProductShot lang={lang} preview={featuredPreview} />
            </div>
          </div>
        </div>
      </section>

      <section id="destinations" className="canvas-section">
        <div className="page-container">
          <SectionIntro
            eyebrow={lang === "zh" ? "Destinations" : "Destinations"}
            title={lang === "zh" ? "三個目的地，一套更有品味的規劃流程" : "Three destinations, one sharper planning flow"}
            description={
              lang === "zh"
                ? "每個章節都保留旅遊內容的故事性，同時讓你能快速進入篩選、選點與 itinerary 規劃。"
                : "Each destination keeps the editorial storytelling, then moves you quickly into curation, selection, and itinerary planning."
            }
          />

          <div className="destination-grid">
            {COUNTRY_ORDER.map((countryKey) => {
              const stats = destinationGroups[countryKey] || { regionCount: 0, attractionCount: 0 };
              return (
                <CountryCard
                  key={countryKey}
                  countryKey={countryKey}
                  config={COUNTRY_CONFIG[countryKey]}
                  attractionCount={stats.attractionCount}
                  regionCount={stats.regionCount}
                  lang={lang}
                  onClick={() => onCountryClick(countryKey)}
                />
              );
            })}
          </div>
        </div>
      </section>

      <FeaturedSection attractions={attractions} lang={lang} onCountryClick={onCountryClick} />
      <ValueProps lang={lang} />
      <StatsBar attractionCount={attractions.length} regionCount={regions.length} lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}
