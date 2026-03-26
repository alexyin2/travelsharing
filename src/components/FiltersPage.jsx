import {
  COUNTRY_CONFIG,
  PURPOSE_OPTIONS,
  TRANSPORT_OPTIONS,
  PACE_OPTIONS,
  SEASON_OPTIONS,
  DURATION_OPTIONS,
  getCountryName,
} from "../lib/constants";

const FILTER_SECTION_COPY = {
  purpose: {
    zh: "先決定這趟旅程要更接近放鬆、掃景點，還是帶一點探索感。",
    en: "Decide whether the route should feel relaxed, comprehensive, or a little more exploratory.",
  },
  duration: {
    zh: "旅行天數會直接影響我們如何安排移動距離與留白。",
    en: "Trip length shapes how aggressively we plan driving distances and breathing room.",
  },
  transport: {
    zh: "不同移動方式會改變停點密度，也會影響一天的節奏。",
    en: "Your transportation choice changes both stop density and the tempo of each day.",
  },
  pace: {
    zh: "同樣的景點，可以排成舒服、平衡或更緊密的版本。",
    en: "The same places can be arranged into a softer, balanced, or denser travel rhythm.",
  },
  season: {
    zh: "季節會影響光線、日照、步道條件與停留時間。",
    en: "Season shifts the light, daylight hours, trail conditions, and how long each stop deserves.",
  },
};

function FilterSection({ label, description, options, value, onChange, lang, wide }) {
  return (
    <div className="field-group">
      <div className="field-group__header">
        <label>{label}</label>
        {description ? <p className="field-group__hint">{description}</p> : null}
      </div>
      <div className={`choice-row ${wide ? "choice-row--wide" : ""}`}>
        {options.map((opt) => (
          <button
            key={opt.val}
            className={`choice-chip ${wide ? "choice-chip--wide" : ""} ${value === opt.val ? "choice-chip--active" : ""}`}
            onClick={() => onChange(value === opt.val ? null : opt.val)}
            type="button"
          >
            <span className="choice-chip__copy">
              {wide ? <span className="choice-chip__eyebrow">{lang === "zh" ? opt.en : opt.zh}</span> : null}
              <span className="choice-chip__label">{lang === "zh" ? opt.zh : opt.en}</span>
              {wide && (lang === "zh" ? opt.noteZh : opt.noteEn) ? (
                <span className="choice-chip__note">{lang === "zh" ? opt.noteZh : opt.noteEn}</span>
              ) : null}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DurationFilter({ value, onChange, lang }) {
  return (
    <div className="field-group">
      <div className="field-group__header">
        <label>{lang === "zh" ? "旅行天數" : "Trip duration"}</label>
        <p className="field-group__hint">{lang === "zh" ? FILTER_SECTION_COPY.duration.zh : FILTER_SECTION_COPY.duration.en}</p>
      </div>
      <div className="choice-row">
        {DURATION_OPTIONS.map((opt) => (
          <button
            key={opt.val}
            className={`choice-chip ${value?.val === opt.val ? "choice-chip--active" : ""}`}
            onClick={() => onChange(value?.val === opt.val ? null : opt)}
            type="button"
          >
            <span className="choice-chip__label">{lang === "zh" ? opt.zh : opt.en}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function FiltersPage({ lang, selectedCountry, filters, setFilters, matchCount, bestMatch }) {
  const currentCountry = COUNTRY_CONFIG[selectedCountry];

  const update = (key) => (val) => setFilters((prev) => ({ ...prev, [key]: val }));

  const activeFilterCount = Object.values(filters).filter((v) => v != null).length;

  return (
    <div className={`inner-page inner-page--filters inner-page--${lang}`}>
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
              ? "設定你的旅行偏好，我們會為你找到最合適的行程路線。"
              : "Set your travel preferences and we will find the best matching itinerary for you."}
          </p>
          <div className="inner-hero__meta">
            <span>{matchCount} {lang === "zh" ? "條符合的行程" : "matching itineraries"}</span>
            {activeFilterCount > 0 ? (
              <span>{activeFilterCount} {lang === "zh" ? "個篩選條件" : "filters active"}</span>
            ) : null}
          </div>
        </div>
      </section>

      <section className="page-container composer-layout composer-layout--filters">
        <div className="composer-panel">
          <p className="eyebrow">{lang === "zh" ? "Trip Filters" : "Trip Filters"}</p>
          <h2 className="filters-heading">{lang === "zh" ? "告訴我們你的旅行偏好" : "Tell us your travel preferences"}</h2>

          <div className="form-stack">
            <FilterSection
              label={lang === "zh" ? "旅行目的" : "Trip purpose"}
              description={lang === "zh" ? FILTER_SECTION_COPY.purpose.zh : FILTER_SECTION_COPY.purpose.en}
              options={PURPOSE_OPTIONS}
              value={filters.purpose}
              onChange={update("purpose")}
              lang={lang}
              wide
            />

            <DurationFilter value={filters.duration} onChange={update("duration")} lang={lang} />

            <FilterSection
              label={lang === "zh" ? "交通方式" : "Transportation"}
              description={lang === "zh" ? FILTER_SECTION_COPY.transport.zh : FILTER_SECTION_COPY.transport.en}
              options={TRANSPORT_OPTIONS}
              value={filters.transport}
              onChange={update("transport")}
              lang={lang}
              wide
            />

            <FilterSection
              label={lang === "zh" ? "旅行節奏" : "Travel pace"}
              description={lang === "zh" ? FILTER_SECTION_COPY.pace.zh : FILTER_SECTION_COPY.pace.en}
              options={PACE_OPTIONS}
              value={filters.pace}
              onChange={update("pace")}
              lang={lang}
              wide
            />

            <FilterSection
              label={lang === "zh" ? "季節" : "Season"}
              description={lang === "zh" ? FILTER_SECTION_COPY.season.zh : FILTER_SECTION_COPY.season.en}
              options={SEASON_OPTIONS}
              value={filters.season}
              onChange={update("season")}
              lang={lang}
            />

          </div>
        </div>

        <aside className="composer-sidebar">
          <div className="summary-card summary-card--results">
            <p className="eyebrow">{lang === "zh" ? "搜尋結果" : "Results"}</p>
            <h2>{lang === "zh" ? "目前最接近的路線方向" : "The closest route direction right now"}</h2>
            <div className="summary-card__hero">
              <strong className="summary-card__count">{matchCount}</strong>
              <div className="summary-card__hero-copy">
                <span>{lang === "zh" ? "條符合的行程" : "matching itineraries"}</span>
                <p>
                  {lang === "zh"
                    ? "篩選條件越清楚，推薦結果就會越接近你真正會出發的版本。"
                    : "The clearer the filters, the closer the recommendation gets to a route you would actually take."}
                </p>
              </div>
            </div>
            <div className="summary-card__facts">
              <div className="summary-card__fact">
                <span>{lang === "zh" ? "目的地" : "Destination"}</span>
                <strong>{getCountryName(selectedCountry, lang)}</strong>
              </div>
              <div className="summary-card__fact">
                <span>{lang === "zh" ? "已啟用條件" : "Active filters"}</span>
                <strong>{activeFilterCount}</strong>
              </div>
            </div>
            {matchCount === 0 ? (
              <p className="summary-card__empty">
                {lang === "zh"
                  ? "目前沒有完全符合的行程，試著放寬一些條件。"
                  : "No exact matches found. Try relaxing some filters."}
              </p>
            ) : null}
            {bestMatch ? (
              <div className="summary-card__preview">
                <p className="summary-card__preview-eyebrow">{lang === "zh" ? "推薦路線" : "Suggested route"}</p>
                <strong>{lang === "zh" ? bestMatch.titleZh : bestMatch.titleEn}</strong>
                <span>{bestMatch.durationDays} {lang === "zh" ? "天" : "days"}</span>
                <p>{lang === "zh" ? bestMatch.descriptionZh : bestMatch.descriptionEn}</p>
              </div>
            ) : null}
          </div>

          {activeFilterCount > 0 ? (
            <div className="summary-card summary-card--soft">
              <p className="eyebrow">{lang === "zh" ? "目前篩選" : "Active Filters"}</p>
              <h2>{lang === "zh" ? "這次旅程的設定輪廓" : "The outline of this trip"}</h2>
              <p>
                {lang === "zh"
                  ? "這些條件會一起決定停點密度、每日移動距離，以及餐廳和住宿的安排方式。"
                  : "These filters shape stop density, daily travel distance, and how the route handles dining and stays."}
              </p>
              <div className="selected-chip-list">
                {filters.purpose ? <span className="selected-chip">{PURPOSE_OPTIONS.find((o) => o.val === filters.purpose)?.[lang] || filters.purpose}</span> : null}
                {filters.transport ? <span className="selected-chip">{TRANSPORT_OPTIONS.find((o) => o.val === filters.transport)?.[lang] || filters.transport}</span> : null}
                {filters.pace ? <span className="selected-chip">{PACE_OPTIONS.find((o) => o.val === filters.pace)?.[lang] || filters.pace}</span> : null}
                {filters.season ? <span className="selected-chip">{SEASON_OPTIONS.find((o) => o.val === filters.season)?.[lang] || filters.season}</span> : null}
                {filters.duration ? <span className="selected-chip">{lang === "zh" ? filters.duration.zh : filters.duration.en}</span> : null}
              </div>
              <button
                className="filter-reset-button"
                onClick={() => setFilters({ purpose: null, transport: null, pace: null, season: null, duration: null })}
                type="button"
              >
                {lang === "zh" ? "清除全部" : "Clear all"}
              </button>
            </div>
          ) : null}
        </aside>
      </section>
    </div>
  );
}
