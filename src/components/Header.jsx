import { useEffect, useRef, useState } from "react";
import { COUNTRY_CONFIG, getCountryName } from "../lib/constants";

export default function Header({ lang, setLang, step, selectedCountry, onBack }) {
  const showBack = step !== "landing";
  const currentCountry = selectedCountry ? COUNTRY_CONFIG[selectedCountry] : null;
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef(null);

  useEffect(() => {
    function handlePointerDown(event) {
      if (!languageMenuRef.current?.contains(event.target)) {
        setLanguageMenuOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") setLanguageMenuOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

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

        <div ref={languageMenuRef} className={`language-menu ${languageMenuOpen ? "language-menu--open" : ""}`}>
          <button
            className="button-shell button-shell--ring"
            aria-expanded={languageMenuOpen}
            aria-haspopup="menu"
            onClick={() => setLanguageMenuOpen((open) => !open)}
            type="button"
          >
            <span className="pill-button pill-button--ghost pill-button--language">
              <span className="pill-button__meta" aria-hidden="true">◎</span>
              <span className="pill-button__text">{lang === "zh" ? "語言" : "Language"}</span>
              <span className="pill-button__meta" aria-hidden="true">{languageMenuOpen ? "−" : "+"}</span>
            </span>
          </button>

          {languageMenuOpen ? (
            <div className="language-menu__panel" role="menu">
              <button
                className={`language-menu__option ${lang === "en" ? "language-menu__option--active" : ""}`}
                onClick={() => {
                  setLang("en");
                  setLanguageMenuOpen(false);
                }}
                role="menuitemradio"
                aria-checked={lang === "en"}
                type="button"
              >
                <span>English</span>
                <span className="language-menu__abbr">EN</span>
              </button>
              <button
                className={`language-menu__option ${lang === "zh" ? "language-menu__option--active" : ""}`}
                onClick={() => {
                  setLang("zh");
                  setLanguageMenuOpen(false);
                }}
                role="menuitemradio"
                aria-checked={lang === "zh"}
                type="button"
              >
                <span>繁體中文</span>
                <span className="language-menu__abbr">ZH</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
