import SectionIntro from "./SectionIntro";
import ItineraryCard from "./ItineraryCard";

export default function FeaturedSection({ itineraries, lang, onCountryClick }) {
  if (!itineraries || itineraries.length === 0) return null;

  return (
    <section className="canvas-section">
      <div className="page-container">
        <SectionIntro
          eyebrow={lang === "zh" ? "精選行程" : "Featured Itineraries"}
          title={lang === "zh" ? "精選行程，感受每條路線的旅行節奏" : "Featured itineraries to feel the rhythm of each route"}
          description={
            lang === "zh"
              ? "作者親身走過的路線，整理成可以直接參考的行程規劃。"
              : "Routes shaped from firsthand trips, ready to inspire your own itinerary."
          }
        />

        <div className="editorial-grid">
          {itineraries.map((itinerary) => (
            <ItineraryCard
              key={itinerary._id}
              itinerary={itinerary}
              lang={lang}
              onClick={() => onCountryClick(itinerary.country)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
