import { useEffect, useMemo, useRef, useState } from "react";
import AttractionsPage from "./components/AttractionsPage";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import { TYPE_EMOJI_FALLBACK } from "./lib/constants";
import { useSanityData } from "./hooks/useSanityData";

function TripForm({ lang, config, setConfig }) {
  const durationOptions = [3, 4, 5, 6, 7];
  const transportOptions = [
    { val: "car", zh: "租車自駕", en: "Rent a car", icon: "🚗" },
    { val: "bus", zh: "大眾運輸", en: "Public transit", icon: "🚌" },
    { val: "mixed", zh: "混合節奏", en: "Mixed pace", icon: "🔀" },
  ];

  return (
    <div className="form-stack">
      <div className="field-group">
        <label>{lang === "zh" ? "旅行天數" : "Trip duration"}</label>
        <div className="choice-row">
          {durationOptions.map((days) => (
            <button
              key={days}
              className={`choice-chip ${config.days === days ? "choice-chip--active" : ""}`}
              onClick={() => setConfig({ ...config, days })}
              type="button"
            >
              {days} {lang === "zh" ? "天" : "days"}
            </button>
          ))}
        </div>
      </div>

      <div className="form-grid">
        <div className="field-group">
          <label>{lang === "zh" ? "抵達時間" : "Arrival time"}</label>
          <select
            className="field-select"
            onChange={(event) => setConfig({ ...config, arrival: event.target.value })}
            value={config.arrival}
          >
            <option value="morning">{lang === "zh" ? "上午 (06-12)" : "Morning (06-12)"}</option>
            <option value="afternoon">{lang === "zh" ? "下午 (12-18)" : "Afternoon (12-18)"}</option>
            <option value="evening">{lang === "zh" ? "晚上 (18-24)" : "Evening (18-24)"}</option>
          </select>
        </div>

        <div className="field-group">
          <label>{lang === "zh" ? "離開時間" : "Departure time"}</label>
          <select
            className="field-select"
            onChange={(event) => setConfig({ ...config, departure: event.target.value })}
            value={config.departure}
          >
            <option value="morning">{lang === "zh" ? "上午 (06-12)" : "Morning (06-12)"}</option>
            <option value="afternoon">{lang === "zh" ? "下午 (12-18)" : "Afternoon (12-18)"}</option>
            <option value="evening">{lang === "zh" ? "晚上 (18-24)" : "Evening (18-24)"}</option>
          </select>
        </div>
      </div>

      <div className="field-group">
        <label>{lang === "zh" ? "交通方式" : "Transportation"}</label>
        <div className="choice-row choice-row--wide">
          {transportOptions.map((transport) => (
            <button
              key={transport.val}
              className={`choice-chip choice-chip--wide ${config.transport === transport.val ? "choice-chip--active" : ""}`}
              onClick={() => setConfig({ ...config, transport: transport.val })}
              type="button"
            >
              <span>{transport.icon}</span>
              <span>{transport[lang]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ItineraryPreview({ lang, itinerary, locked }) {
  if (!itinerary) return null;

  return (
    <div className="itinerary-board">
      {itinerary.map((day, index) => (
        <article key={day.title} className="itinerary-day">
          {locked && index > 0 ? (
            <div className="itinerary-day__lock">
              <strong>{lang === "zh" ? "付費後解鎖完整日程" : "Unlock the full itinerary"}</strong>
              <span>{lang === "zh" ? "目前僅顯示第一天作為預覽。" : "Only day one is revealed in preview mode."}</span>
            </div>
          ) : null}

          <div className="itinerary-day__header">
            <span className="itinerary-day__index">D{index + 1}</span>
            <div>
              <h3>{day.title}</h3>
              <p>{lang === "zh" ? "按時間順序排列的旅程節奏" : "A time-based rhythm for the day"}</p>
            </div>
          </div>

          <div className="itinerary-day__items">
            {day.items.length > 0 ? (
              day.items.map((item) => (
                <div key={`${day.title}-${item.time}-${item.name}`} className="itinerary-stop">
                  <span className="itinerary-stop__time">{item.time}</span>
                  <div className="itinerary-stop__body">
                    <strong>{item.emoji} {item.name}</strong>
                    <p>{item.note}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="itinerary-stop itinerary-stop--empty">
                <span className="itinerary-stop__time">TBD</span>
                <div className="itinerary-stop__body">
                  <strong>{lang === "zh" ? "保留自由活動" : "Reserved for free time"}</strong>
                  <p>{lang === "zh" ? "這一天會依照更多偏好繼續補齊。" : "This day can be filled out once more preferences are added."}</p>
                </div>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export default function App() {
  const { attractions, regions, loading, error } = useSanityData();
  const [lang, setLang] = useState("zh");
  const [step, setStep] = useState("landing");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selected, setSelected] = useState([]);
  const [regionFilter, setRegionFilter] = useState("all");
  const [config, setConfig] = useState({ days: 5, arrival: "morning", departure: "morning", transport: "mixed" });
  const [generating, setGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const contentRef = useRef(null);

  const selectedAttractions = useMemo(
    () => attractions.filter((attraction) => selected.includes(attraction._id)),
    [attractions, selected],
  );

  const toggleSelect = (id) => {
    setSelected((previous) => (previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]));
  };

  const handleCountryClick = (countryKey) => {
    setSelectedCountry(countryKey);
    setRegionFilter("all");
    setSelected([]);
    setItinerary(null);
    setStep("attractions");
  };

  const handleBack = () => {
    if (step === "attractions") {
      setStep("landing");
      setSelectedCountry(null);
      setSelected([]);
      setRegionFilter("all");
    } else if (step === "config") {
      setStep("attractions");
    } else if (step === "itinerary") {
      setStep("config");
    }
  };

  const generateItinerary = () => {
    setGenerating(true);
    setTimeout(() => {
      const days = [];
      const perDay = Math.max(1, Math.ceil(selectedAttractions.length / config.days));
      const timeSlots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

      for (let dayIndex = 0; dayIndex < config.days; dayIndex += 1) {
        const dayAttractions = selectedAttractions.slice(dayIndex * perDay, (dayIndex + 1) * perDay);
        const firstAttraction = dayAttractions[0];
        days.push({
          title: lang === "zh"
            ? `第 ${dayIndex + 1} 天 · ${firstAttraction ? firstAttraction.nameZh : "自由安排"}`
            : `Day ${dayIndex + 1} · ${firstAttraction ? firstAttraction.nameEn : "Open Schedule"}`,
          items: dayAttractions.map((attraction, attractionIndex) => ({
            time: timeSlots[attractionIndex] || "TBD",
            emoji: TYPE_EMOJI_FALLBACK[attraction.type] || "📍",
            name: lang === "zh" ? attraction.nameZh : attraction.nameEn,
            note: lang === "zh" ? attraction.descriptionZh : attraction.descriptionEn,
          })),
        });
      }

      setItinerary(days);
      setGenerating(false);
      setStep("itinerary");
    }, 1600);
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
        {step === "attractions" ? (
          <AttractionsPage
            attractions={attractions}
            lang={lang}
            onToggle={toggleSelect}
            regionFilter={regionFilter}
            regions={regions}
            selected={selected}
            selectedCountry={selectedCountry}
            setRegionFilter={setRegionFilter}
          />
        ) : null}

        {step === "config" ? (
          <section className="page-container composer-layout">
            <div className="composer-panel">
              <p className="eyebrow">{lang === "zh" ? "Trip Composer" : "Trip Composer"}</p>
              <h1>{lang === "zh" ? "設定你的旅行條件" : "Set the trip parameters"}</h1>
              <p className="composer-panel__lead">
                {lang === "zh"
                  ? "在這裡決定旅程天數、到達節奏與交通方式，系統會把你選的景點整理成更順的 itinerary。"
                  : "Set your duration, arrival rhythm, and transportation style here so the itinerary can be shaped around your picks."}
              </p>
              <TripForm config={config} lang={lang} setConfig={setConfig} />
            </div>

            <aside className="composer-sidebar">
              <div className="summary-card">
                <p className="eyebrow">{lang === "zh" ? "已選景點" : "Selected Spots"}</p>
                <h2>{lang === "zh" ? "這次準備放進行程的景點" : "What is going into this draft"}</h2>
                <div className="selected-chip-list">
                  {selectedAttractions.length > 0 ? (
                    selectedAttractions.map((attraction) => (
                      <span key={attraction._id} className="selected-chip">
                        {TYPE_EMOJI_FALLBACK[attraction.type] || "📍"} {lang === "zh" ? attraction.nameZh : attraction.nameEn}
                      </span>
                    ))
                  ) : (
                    <p className="summary-card__empty">
                      {lang === "zh" ? "還沒有選任何景點，回上一頁加入幾個你想去的地方。" : "No spots selected yet. Go back and add a few places first."}
                    </p>
                  )}
                </div>
              </div>

              <div className="summary-card summary-card--soft">
                <p className="eyebrow">{lang === "zh" ? "預覽規則" : "Preview Rules"}</p>
                <ul className="summary-list">
                  <li>{lang === "zh" ? "行程會依你選的景點平均分配到每天。" : "Selected spots are distributed evenly across the trip."}</li>
                  <li>{lang === "zh" ? "目前仍為 demo flow，付款與正式解鎖尚未接上。" : "This is still a demo flow; payments and unlocking are placeholders."}</li>
                  <li>{lang === "zh" ? "你可以回上一頁繼續增減景點。" : "You can always go back and refine the selection."}</li>
                </ul>
              </div>
            </aside>
          </section>
        ) : null}

        {step === "itinerary" ? (
          <section className="page-container itinerary-layout">
            <div className="composer-panel">
              <p className="eyebrow">{lang === "zh" ? "Itinerary Preview" : "Itinerary Preview"}</p>
              <h1>{lang === "zh" ? "你的專屬 itinerary 已經成形" : "Your itinerary draft is taking shape"}</h1>
              <p className="composer-panel__lead">
                {lang === "zh"
                  ? "目前先顯示第一天與整體節奏，完整版本會包含交通串接、順路排序與更多餐廳建議。"
                  : "You can preview day one and the overall rhythm now; the full version would include transport flow, route ordering, and more dining suggestions."}
              </p>
              <ItineraryPreview itinerary={itinerary} lang={lang} locked />
            </div>

            <aside className="composer-sidebar">
              <div className="paywall-card">
                <p className="eyebrow">{lang === "zh" ? "解鎖完整內容" : "Unlock"}</p>
                <h2>{lang === "zh" ? "升級成完整路線包" : "Upgrade to the full route pack"}</h2>
                <p>
                  {lang === "zh"
                    ? "包含每日詳細時間表、交通接駁指引、順路調整與餐廳建議。"
                    : "Includes daily schedules, transport guidance, route optimization, and dining suggestions."}
                </p>
                <div className="paywall-card__price">{lang === "zh" ? "NT$299" : "$9.99"}</div>
                <div className="paywall-card__bullets">
                  <span>{lang === "zh" ? "逐日時間表" : "Day-by-day schedule"}</span>
                  <span>{lang === "zh" ? "順路與節奏註記" : "Route flow notes"}</span>
                  <span>{lang === "zh" ? "交通串接指南" : "Transport guide"}</span>
                </div>
              </div>
            </aside>
          </section>
        ) : null}
      </div>

      <div className="cta-dock-wrap">
        <div className="cta-dock">
          {step === "attractions" ? (
            <button
              className="cta-button"
              disabled={selected.length === 0}
              onClick={() => setStep("config")}
              type="button"
            >
              {lang === "zh" ? `下一步 · 已選 ${selected.length} 個景點` : `Continue · ${selected.length} spots selected`}
            </button>
          ) : null}

          {step === "config" ? (
            <button className="cta-button" disabled={generating} onClick={generateItinerary} type="button">
              {generating
                ? (lang === "zh" ? "AI 正在生成 itinerary..." : "AI is generating the itinerary...")
                : (lang === "zh" ? "生成我的專屬 itinerary" : "Generate my itinerary")}
            </button>
          ) : null}

          {step === "itinerary" ? (
            <div className="cta-dock__split">
              <button
                className="secondary-button"
                onClick={() => {
                  setStep("attractions");
                  setItinerary(null);
                  setSelected([]);
                }}
                type="button"
              >
                {lang === "zh" ? "重新選景點" : "Reselect spots"}
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
