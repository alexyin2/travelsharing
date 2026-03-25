import { COUNTRY_CONFIG, getCountryName } from "../lib/constants";

export default function Header({ lang, setLang, step, selectedCountry, onBack }) {
  const showBack = step !== "landing";
  const currentCountry = selectedCountry ? COUNTRY_CONFIG[selectedCountry] : null;

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__brand">
          {showBack ? (
            <button className="button-shell button-shell--ring" onClick={onBack} type="button">
              <span className="pill-button pill-button--ghost">
                <span className="pill-button__icon">←</span>
                {lang === "zh" ? "返回" : "Back"}
              </span>
            </button>
          ) : (
            <span className="site-header__seal">{lang === "zh" ? "旅" : "AT"}</span>
          )}

          <div>
            <div className="site-header__eyebrow">AlexTravelSharing</div>
            <div className="site-header__title">
              {showBack && currentCountry ? (
                <>
                  <span>{currentCountry.emoji}</span>
                  <span>{getCountryName(selectedCountry, lang)}</span>
                </>
              ) : (
                <>
                  <span>Editorial itineraries</span>
                  <span className="site-header__dot" />
                  <span>{lang === "zh" ? "真實旅行故事" : "Real travel stories"}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <button
          className="button-shell button-shell--ring"
          onClick={() => setLang((currentLang) => (currentLang === "zh" ? "en" : "zh"))}
          type="button"
        >
          <span className="pill-button pill-button--ghost">
            {lang === "zh" ? "EN" : "中文"}
          </span>
        </button>
      </div>
    </header>
  );
}
