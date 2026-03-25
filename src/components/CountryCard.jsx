export default function CountryCard({ countryKey, config, attractionCount, regionCount, lang, onClick }) {
  return (
    <article
      className="destination-card"
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      role="button"
      style={{ "--country-accent": config.accent }}
      tabIndex={0}
    >
      <div className="destination-card__media">
        <img alt={lang === "zh" ? config.zhName : config.enName} src={config.image} />
      </div>

      <div className="destination-card__body">
        <div className="destination-card__header">
          <p className="eyebrow">{countryKey}</p>
          <div className="destination-card__name">
            <span>{config.emoji}</span>
            <h3>{lang === "zh" ? config.zhName : config.enName}</h3>
          </div>
        </div>

        <p className="destination-card__description">{config.description[lang]}</p>

        <div className="destination-card__meta">
          <span>{regionCount} {lang === "zh" ? "個區域" : "regions"}</span>
          <span>{attractionCount} {lang === "zh" ? "個景點" : "spots"}</span>
        </div>

        <div className="destination-card__footer">
          <span className="destination-card__marketing">
            {lang === "zh" ? "瀏覽行程" : "Browse itineraries"}
          </span>
          <span className="destination-card__arrow">↗</span>
        </div>
      </div>
    </article>
  );
}
