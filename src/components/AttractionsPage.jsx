import { useMemo } from "react";
import { COUNTRY_CONFIG, getCountryName } from "../lib/constants";
import AttractionCard from "./AttractionCard";

export default function AttractionsPage({
  lang,
  attractions,
  regions,
  selectedCountry,
  selected,
  onToggle,
  regionFilter,
  setRegionFilter,
}) {
  const countryRegions = useMemo(() => {
    return regions
      .filter((region) => region.country === selectedCountry)
      .map((region) => ({
        ...region,
        attractionCount: attractions.filter((attraction) => attraction.region?.slug === region.slug).length,
      }));
  }, [regions, selectedCountry, attractions]);

  const filtered = useMemo(() => {
    const countryAttractions = attractions.filter((attraction) => attraction.region?.country === selectedCountry);
    if (regionFilter === "all") return countryAttractions;
    return countryAttractions.filter((attraction) => attraction.region?.slug === regionFilter);
  }, [attractions, selectedCountry, regionFilter]);

  const currentCountry = COUNTRY_CONFIG[selectedCountry];

  return (
    <div className="inner-page">
      <section className="inner-hero">
        <div className="inner-hero__media">
          <img alt="" src={currentCountry?.image} />
        </div>
        <div className="inner-hero__overlay" />
        <div className="inner-hero__content">
          <p className="eyebrow">{selectedCountry}</p>
          <h1>{getCountryName(selectedCountry, lang)}</h1>
          <p>
            {lang === "zh"
              ? "先從區域與景點挑選開始，系統會把你偏好的節奏整理成可閱讀的 itinerary。"
              : "Start by curating regions and spots, then let the system shape them into a readable itinerary."}
          </p>
          <div className="inner-hero__meta">
            <span>{countryRegions.length} {lang === "zh" ? "個區域" : "regions"}</span>
            <span>{selected.length} {lang === "zh" ? "個已選景點" : "selected spots"}</span>
          </div>
        </div>
      </section>

      <section className="page-container inner-content">
        <div className="filter-bar">
          <button
            className={`filter-pill ${regionFilter === "all" ? "filter-pill--active" : ""}`}
            onClick={() => setRegionFilter("all")}
            type="button"
          >
            {lang === "zh" ? "全部區域" : "All regions"}
          </button>
          {countryRegions.map((region) => (
            <button
              key={region.slug}
              className={`filter-pill ${regionFilter === region.slug ? "filter-pill--active" : ""}`}
              onClick={() => setRegionFilter(region.slug)}
              type="button"
            >
              {lang === "zh" ? region.nameZh : region.nameEn} <span>{region.attractionCount}</span>
            </button>
          ))}
        </div>

        <div className="attractions-grid">
          {filtered.map((attraction) => (
            <AttractionCard key={attraction._id} item={attraction} lang={lang} selected={selected} onToggle={onToggle} />
          ))}
        </div>
      </section>
    </div>
  );
}
