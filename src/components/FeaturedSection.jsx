import { COUNTRY_CONFIG, TYPE_COLORS, TYPE_EMOJI_FALLBACK, getCountryName, getTypeLabel } from "../lib/constants";
import SectionIntro from "./SectionIntro";

export default function FeaturedSection({ attractions, lang, onCountryClick }) {
  const featured = attractions.slice(0, 6);

  if (featured.length === 0) return null;

  return (
    <section className="canvas-section">
      <div className="page-container">
        <SectionIntro
          eyebrow={lang === "zh" ? "精選段落" : "Featured Notes"}
          title={lang === "zh" ? "精選段落，先感受每個地方的旅行語氣" : "A few featured chapters to feel each destination first"}
          description={
            lang === "zh"
              ? "即使目前 Sanity 還沒有上傳景點圖片，首頁仍用策展方式把內容感先做出來。"
              : "Even without attraction photos in Sanity yet, the homepage still frames the content with an editorial rhythm."
          }
        />

        <div className="editorial-grid">
          {featured.map((item) => {
            const countryKey = item.region?.country;
            const country = COUNTRY_CONFIG[countryKey];
            const color = TYPE_COLORS[item.type] || TYPE_COLORS.nature;
            const name = lang === "zh" ? item.nameZh : item.nameEn;
            const description = lang === "zh" ? item.descriptionZh : item.descriptionEn;

            return (
              <article
                key={item._id}
                className="editorial-card"
                onClick={() => onCountryClick(countryKey)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onCountryClick(countryKey);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="editorial-card__image">
                  <img alt="" src={country?.image} />
                  <div className="editorial-card__overlay" />
                  <span className="editorial-card__flag">{country?.emoji}</span>
                </div>

                <div className="editorial-card__body">
                  <div className="editorial-card__chips">
                    <span className="type-chip" style={{ background: color.bg, color: color.text }}>
                      {getTypeLabel(item.type, lang)}
                    </span>
                    <span className="editorial-card__country">{getCountryName(countryKey, lang)}</span>
                  </div>
                  <h3>{TYPE_EMOJI_FALLBACK[item.type] || "📍"} {name}</h3>
                  <p>{description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
