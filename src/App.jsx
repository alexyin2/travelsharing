import { useEffect, useRef, useState } from "react";
import BrowsePage from "./components/BrowsePage";
import Header from "./components/Header";
import ItineraryPage from "./components/ItineraryPage";
import LandingPage from "./components/LandingPage";
import { useSanityData } from "./hooks/useSanityData";
import { useItineraries, useFilteredItineraries } from "./hooks/useItineraries";

const EMPTY_FILTERS = {
  purpose: null,
  transport: null,
  pace: null,
  season: null,
  duration: null,
};

export default function App() {
  const { attractions, regions, loading, error } = useSanityData();
  const [lang, setLang] = useState("en");
  const [step, setStep] = useState("landing");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const contentRef = useRef(null);

  const { allItineraries, loading: itLoading } = useItineraries(selectedCountry);
  const { matched } = useFilteredItineraries(allItineraries, filters);

  const handleCountryClick = (countryKey) => {
    setSelectedCountry(countryKey);
    setFilters(EMPTY_FILTERS);
    setSelectedItinerary(null);
    setStep("browse");
  };

  const handleBack = () => {
    if (step === "browse") {
      setStep("landing");
      setSelectedCountry(null);
      setFilters(EMPTY_FILTERS);
    } else if (step === "itinerary") {
      setStep("browse");
      setSelectedItinerary(null);
    }
  };

  const handleSelectItinerary = (itinerary) => {
    setSelectedItinerary(itinerary);
    setStep("itinerary");
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
        {step === "browse" ? (
          <BrowsePage
            lang={lang}
            selectedCountry={selectedCountry}
            filters={filters}
            setFilters={setFilters}
            matched={matched}
            onSelectItinerary={handleSelectItinerary}
            itLoading={itLoading}
          />
        ) : null}

        {step === "itinerary" ? (
          <ItineraryPage lang={lang} itinerary={selectedItinerary} />
        ) : null}
      </div>

      {step === "itinerary" ? (
        <div className="cta-dock-wrap">
          <div className="cta-dock">
            <div className="cta-dock__split">
              <button
                className="secondary-button"
                onClick={() => {
                  setStep("browse");
                  setSelectedItinerary(null);
                }}
                type="button"
              >
                {lang === "zh" ? "返回瀏覽" : "Back to browse"}
              </button>
              <button
                className="cta-button"
                onClick={() => window.alert(lang === "zh" ? "付費解鎖功能開發中。" : "Unlock flow is coming soon.")}
                type="button"
              >
                {lang === "zh" ? "解鎖進階內容" : "Unlock premium content"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
