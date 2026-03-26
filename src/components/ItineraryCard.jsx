import { COUNTRY_CONFIG, getPurposeLabel } from "../lib/constants";

export default function ItineraryCard({ itinerary, lang, onClick }) {
  const title = lang === "zh" ? itinerary.titleZh : itinerary.titleEn;
  const description = lang === "zh" ? itinerary.descriptionZh : itinerary.descriptionEn;
  const country = COUNTRY_CONFIG[itinerary.country];
  const image = itinerary.coverImageUrl || country?.image;

  return (
    <article
      className="editorial-card"
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="editorial-card__image">
        <img alt="" src={image} />
        <div className="editorial-card__overlay" />
        <span className="editorial-card__flag">{country?.emoji}</span>
      </div>

      <div className="editorial-card__body">
        <div className="editorial-card__chips">
          <span className="type-chip" style={{ background: "#1d3d59", color: "#b4e3ff" }}>
            {itinerary.durationDays} {lang === "zh" ? "天" : "days"}
          </span>
          {itinerary.purpose ? (
            <span className="editorial-card__country">{getPurposeLabel(itinerary.purpose, lang)}</span>
          ) : null}
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}
