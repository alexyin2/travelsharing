import { COUNTRY_CONFIG, TYPE_COLORS, TYPE_EMOJI_FALLBACK, getTypeLabel } from "../lib/constants";

export default function AttractionCard({ item, lang, selected, onToggle }) {
  const color = TYPE_COLORS[item.type] || TYPE_COLORS.nature;
  const isSelected = selected.includes(item._id);
  const emoji = TYPE_EMOJI_FALLBACK[item.type] || "📍";
  const name = lang === "zh" ? item.nameZh : item.nameEn;
  const rawDesc = lang === "zh" ? item.descriptionZh : item.descriptionEn;
  const tip = lang === "zh" ? item.insiderTipZh : item.insiderTipEn;
  const regionName = item.region ? (lang === "zh" ? item.region.nameZh : item.region.nameEn) : "";
  const countryImage = COUNTRY_CONFIG[item.region?.country]?.image;
  const toggleLabel = isSelected
    ? (lang === "zh" ? "已選" : "Selected")
    : (lang === "zh" ? "加入" : "Pick");

  return (
    <article className={`attraction-card ${isSelected ? "attraction-card--selected" : ""}`}>
      <button className="attraction-card__button" onClick={() => onToggle(item._id)} type="button">
        <div className="attraction-card__media">
          <img alt="" src={item.cardImageUrl || countryImage} />
          <div className="attraction-card__shade" />
          <span className="attraction-card__emoji">{emoji}</span>
          <span className="type-chip attraction-card__chip" style={{ background: color.bg, color: color.text }}>
            {getTypeLabel(item.type, lang)}
          </span>
          <span className="attraction-card__toggle">{toggleLabel}</span>
        </div>

        <div className="attraction-card__body">
          <div className="attraction-card__title-row">
            <h3>{name}</h3>
            {regionName ? <span>{regionName}</span> : null}
          </div>
          <p>{rawDesc}</p>

          <div className="attraction-card__meta">
            {item.suggestedDuration ? (
              <span>{lang === "zh" ? "建議" : "Suggested"} {item.suggestedDuration >= 60 ? `${Math.round(item.suggestedDuration / 60)}h` : `${item.suggestedDuration}m`}</span>
            ) : null}
            {item.bestTimeOfDay ? <span>{item.bestTimeOfDay}</span> : null}
          </div>

          {tip ? (
            <div className="attraction-card__tip">
              {lang === "zh" ? "旅人提示：" : "Insider Tip:"} {tip}
            </div>
          ) : null}
        </div>
      </button>
    </article>
  );
}
