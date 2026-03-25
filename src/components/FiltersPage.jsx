import {
  COUNTRY_CONFIG,
  PURPOSE_OPTIONS,
  TRANSPORT_OPTIONS,
  PACE_OPTIONS,
  BUDGET_OPTIONS,
  SEASON_OPTIONS,
  ARRIVAL_DEPARTURE_OPTIONS,
  DURATION_OPTIONS,
  getCountryName,
} from "../lib/constants";

function FilterSection({ label, options, value, onChange, lang, wide }) {
  return (
    <div className="field-group">
      <label>{label}</label>
      <div className={`choice-row ${wide ? "choice-row--wide" : ""}`}>
        {options.map((opt) => (
          <button
            key={opt.val}
            className={`choice-chip ${wide ? "choice-chip--wide" : ""} ${value === opt.val ? "choice-chip--active" : ""}`}
            onClick={() => onChange(value === opt.val ? null : opt.val)}
            type="button"
          >
            <span>{opt.icon}</span>
            <span>{lang === "zh" ? opt.zh : opt.en}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DurationFilter({ value, onChange, lang }) {
  return (
    <div className="field-group">
      <label>{lang === "zh" ? "旅行天數" : "Trip duration"}</label>
      <div className="choice-row">
        {DURATION_OPTIONS.map((opt) => (
          <button
            key={opt.val}
            className={`choice-chip ${value?.val === opt.val ? "choice-chip--active" : ""}`}
            onClick={() => onChange(value?.val === opt.val ? null : opt)}
            type="button"
          >
            {lang === "zh" ? opt.zh : opt.en}
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

      <section className="page-container composer-layout">
        <div className="composer-panel">
          <p className="eyebrow">{lang === "zh" ? "Trip Filters" : "Trip Filters"}</p>
          <h2 className="filters-heading">{lang === "zh" ? "告訴我們你的旅行偏好" : "Tell us your travel preferences"}</h2>

          <div className="form-stack">
            <FilterSection
              label={lang === "zh" ? "旅行目的" : "Trip purpose"}
              options={PURPOSE_OPTIONS}
              value={filters.purpose}
              onChange={update("purpose")}
              lang={lang}
              wide
            />

            <DurationFilter value={filters.duration} onChange={update("duration")} lang={lang} />

            <FilterSection
              label={lang === "zh" ? "交通方式" : "Transportation"}
              options={TRANSPORT_OPTIONS}
              value={filters.transport}
              onChange={update("transport")}
              lang={lang}
              wide
            />

            <FilterSection
              label={lang === "zh" ? "旅行節奏" : "Travel pace"}
              options={PACE_OPTIONS}
              value={filters.pace}
              onChange={update("pace")}
              lang={lang}
              wide
            />

            <FilterSection
              label={lang === "zh" ? "季節" : "Season"}
              options={SEASON_OPTIONS}
              value={filters.season}
              onChange={update("season")}
              lang={lang}
            />

            <div className="form-grid">
              <FilterSection
                label={lang === "zh" ? "抵達時間" : "Arrival time"}
                options={ARRIVAL_DEPARTURE_OPTIONS}
                value={filters.arrivalTime}
                onChange={update("arrivalTime")}
                lang={lang}
              />
              <FilterSection
                label={lang === "zh" ? "離開時間" : "Departure time"}
                options={ARRIVAL_DEPARTURE_OPTIONS}
                value={filters.departureTime}
                onChange={update("departureTime")}
                lang={lang}
              />
            </div>

            <FilterSection
              label={lang === "zh" ? "預算等級" : "Budget level"}
              options={BUDGET_OPTIONS}
              value={filters.budget}
              onChange={update("budget")}
              lang={lang}
              wide
            />
          </div>
        </div>

        <aside className="composer-sidebar">
          <div className="summary-card">
            <p className="eyebrow">{lang === "zh" ? "搜尋結果" : "Results"}</p>
            <h2>{matchCount} {lang === "zh" ? "條行程符合" : "itineraries match"}</h2>
            {matchCount === 0 ? (
              <p className="summary-card__empty">
                {lang === "zh"
                  ? "目前沒有完全符合的行程，試著放寬一些條件。"
                  : "No exact matches found. Try relaxing some filters."}
              </p>
            ) : null}
            {bestMatch ? (
              <div className="summary-card__preview">
                <strong>{lang === "zh" ? bestMatch.titleZh : bestMatch.titleEn}</strong>
                <span>{bestMatch.durationDays} {lang === "zh" ? "天" : "days"}</span>
                <p>{lang === "zh" ? bestMatch.descriptionZh : bestMatch.descriptionEn}</p>
              </div>
            ) : null}
          </div>

          {activeFilterCount > 0 ? (
            <div className="summary-card summary-card--soft">
              <p className="eyebrow">{lang === "zh" ? "目前篩選" : "Active Filters"}</p>
              <div className="selected-chip-list">
                {filters.purpose ? <span className="selected-chip">{PURPOSE_OPTIONS.find((o) => o.val === filters.purpose)?.[lang] || filters.purpose}</span> : null}
                {filters.transport ? <span className="selected-chip">{TRANSPORT_OPTIONS.find((o) => o.val === filters.transport)?.[lang] || filters.transport}</span> : null}
                {filters.pace ? <span className="selected-chip">{PACE_OPTIONS.find((o) => o.val === filters.pace)?.[lang] || filters.pace}</span> : null}
                {filters.budget ? <span className="selected-chip">{BUDGET_OPTIONS.find((o) => o.val === filters.budget)?.[lang] || filters.budget}</span> : null}
                {filters.season ? <span className="selected-chip">{SEASON_OPTIONS.find((o) => o.val === filters.season)?.[lang] || filters.season}</span> : null}
                {filters.duration ? <span className="selected-chip">{lang === "zh" ? filters.duration.zh : filters.duration.en}</span> : null}
                {filters.arrivalTime ? <span className="selected-chip">{ARRIVAL_DEPARTURE_OPTIONS.find((o) => o.val === filters.arrivalTime)?.[lang] || filters.arrivalTime}</span> : null}
                {filters.departureTime ? <span className="selected-chip">{ARRIVAL_DEPARTURE_OPTIONS.find((o) => o.val === filters.departureTime)?.[lang] || filters.departureTime}</span> : null}
              </div>
              <button
                className="filter-reset-button"
                onClick={() => setFilters({ purpose: null, transport: null, pace: null, budget: null, season: null, duration: null, arrivalTime: null, departureTime: null })}
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
