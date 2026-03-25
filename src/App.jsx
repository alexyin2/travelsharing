import { useEffect, useRef, useState } from "react";
import FiltersPage from "./components/FiltersPage";
import Header from "./components/Header";
import ItineraryPage from "./components/ItineraryPage";
import LandingPage from "./components/LandingPage";
import { useSanityData } from "./hooks/useSanityData";
import { useItineraries, useFilteredItineraries } from "./hooks/useItineraries";

const EMPTY_FILTERS = {
  purpose: null,
  transport: null,
  pace: null,
  budget: null,
  season: null,
  duration: null,
  arrivalTime: null,
  departureTime: null,
};

export default function App() {
  const { attractions, regions, loading, error } = useSanityData();
  const [lang, setLang] = useState("zh");
  const [step, setStep] = useState("landing");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const contentRef = useRef(null);

  const { allItineraries, loading: itLoading } = useItineraries(selectedCountry);
  const { matched, bestMatch } = useFilteredItineraries(allItineraries, filters);

  const handleCountryClick = (countryKey) => {
    setSelectedCountry(countryKey);
    setFilters(EMPTY_FILTERS);
    setSelectedItinerary(null);
    setStep("filters");
  };

  const handleBack = () => {
    if (step === "filters") {
      setStep("landing");
      setSelectedCountry(null);
      setFilters(EMPTY_FILTERS);
    } else if (step === "itinerary") {
      setStep("filters");
      setSelectedItinerary(null);
    }
  };

  const handleViewItinerary = () => {
    if (bestMatch) {
      setSelectedItinerary(bestMatch);
      setStep("itinerary");
    }
  };

  useEffect(() => {
    if (step === "landing") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  if (loading) {
    return (
      <div className="state-screen">
        <div className="state-screen__card">
          <p className="eyebrow">Loading</p>
          <h1>{lang === "zh" ? "正在整理旅程章節" : "Preparing the travel chapters"}</h1>
          <p>{lang === "zh" ? "我們正在從 Sanity 載入景點與區域資料。" : "Attractions and regional content are loading from Sanity."}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-screen">
        <div className="state-screen__card">
          <p className="eyebrow">Load Error</p>
          <h1>{lang === "zh" ? "目前無法載入內容" : "Unable to load the content right now"}</h1>
          <p>{lang === "zh" ? "請稍後再試一次。" : "Please try again in a moment."}</p>
        </div>
      </div>
    );
  }

  if (step === "landing") {
    return (
      <div className="app-shell">
        <Header lang={lang} onBack={handleBack} selectedCountry={selectedCountry} setLang={setLang} step={step} />
        <LandingPage attractions={attractions} lang={lang} onCountryClick={handleCountryClick} regions={regions} />
      </div>
    );
  }

  return (
    <div className="app-shell app-shell--inner">
      <Header lang={lang} onBack={handleBack} selectedCountry={selectedCountry} setLang={setLang} step={step} />

      <div ref={contentRef} className="inner-scroll">
        {step === "filters" ? (
          <FiltersPage
            lang={lang}
            selectedCountry={selectedCountry}
            filters={filters}
            setFilters={setFilters}
            matchCount={matched.length}
            bestMatch={bestMatch}
          />
        ) : null}

        {step === "itinerary" ? (
          <ItineraryPage lang={lang} itinerary={selectedItinerary} />
        ) : null}
      </div>

      <div className="cta-dock-wrap">
        <div className="cta-dock">
          {step === "filters" ? (
            <button
              className="cta-button"
              disabled={matched.length === 0 || itLoading}
              onClick={handleViewItinerary}
              type="button"
            >
              {itLoading
                ? (lang === "zh" ? "載入行程中..." : "Loading itineraries...")
                : matched.length > 0
                  ? (lang === "zh" ? `查看最佳行程 · ${matched.length} 條符合` : `View best match · ${matched.length} found`)
                  : (lang === "zh" ? "沒有符合的行程 · 請調整條件" : "No matches · adjust filters")}
            </button>
          ) : null}

          {step === "itinerary" ? (
            <div className="cta-dock__split">
              <button
                className="secondary-button"
                onClick={() => {
                  setStep("filters");
                  setSelectedItinerary(null);
                }}
                type="button"
              >
                {lang === "zh" ? "重新篩選" : "Change filters"}
              </button>
              <button
                className="cta-button"
                onClick={() => window.alert(lang === "zh" ? "付費解鎖功能開發中。" : "Unlock flow is coming soon.")}
                type="button"
              >
                {lang === "zh" ? "解鎖完整行程" : "Unlock full itinerary"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
