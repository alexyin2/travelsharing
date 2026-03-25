import { useState, useEffect, useRef } from "react";
import { useSanityData } from "./hooks/useSanityData";
import { TYPE_EMOJI_FALLBACK } from "./lib/constants";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import AttractionsPage from "./components/AttractionsPage";

function TripForm({ lang, config, setConfig }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <label style={{ display: "block", fontSize: 13, color: "#6b7280", marginBottom: 6, fontWeight: 500 }}>
          {lang === "zh" ? "旅行天數" : "Trip Duration"}
        </label>
        <div style={{ display: "flex", gap: 8 }}>
          {[3, 4, 5, 6, 7].map(d => (
            <button key={d} onClick={() => setConfig({ ...config, days: d })} style={{
              flex: 1, padding: "12px 0", borderRadius: 10, border: "none", cursor: "pointer",
              background: config.days === d ? "#059669" : "#f3f4f6",
              color: config.days === d ? "#fff" : "#6b7280",
              fontWeight: 700, fontSize: 15, transition: "all 0.2s"
            }}>{d} {lang === "zh" ? "天" : "days"}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={{ display: "block", fontSize: 13, color: "#6b7280", marginBottom: 6, fontWeight: 500 }}>
            {lang === "zh" ? "抵達時間" : "Arrival Time"}
          </label>
          <select value={config.arrival} onChange={e => setConfig({ ...config, arrival: e.target.value })}
            style={{ width: "100%", padding: "12px", borderRadius: 10, border: "1px solid #d1d5db",
              background: "#f9fafb", color: "#111827", fontSize: 14, appearance: "none" }}>
            <option value="morning">{lang === "zh" ? "上午 (06-12)" : "Morning (06-12)"}</option>
            <option value="afternoon">{lang === "zh" ? "下午 (12-18)" : "Afternoon (12-18)"}</option>
            <option value="evening">{lang === "zh" ? "晚上 (18-24)" : "Evening (18-24)"}</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, color: "#6b7280", marginBottom: 6, fontWeight: 500 }}>
            {lang === "zh" ? "離開時間" : "Departure Time"}
          </label>
          <select value={config.departure} onChange={e => setConfig({ ...config, departure: e.target.value })}
            style={{ width: "100%", padding: "12px", borderRadius: 10, border: "1px solid #d1d5db",
              background: "#f9fafb", color: "#111827", fontSize: 14, appearance: "none" }}>
            <option value="morning">{lang === "zh" ? "上午 (06-12)" : "Morning (06-12)"}</option>
            <option value="afternoon">{lang === "zh" ? "下午 (12-18)" : "Afternoon (12-18)"}</option>
            <option value="evening">{lang === "zh" ? "晚上 (18-24)" : "Evening (18-24)"}</option>
          </select>
        </div>
      </div>
      <div>
        <label style={{ display: "block", fontSize: 13, color: "#6b7280", marginBottom: 6, fontWeight: 500 }}>
          {lang === "zh" ? "交通方式" : "Transportation"}
        </label>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { val: "car", zh: "🚗 租車自駕", en: "🚗 Rent a Car" },
            { val: "bus", zh: "🚌 大眾運輸", en: "🚌 Public Transit" },
            { val: "mixed", zh: "🔀 混合", en: "🔀 Mixed" }
          ].map(t => (
            <button key={t.val} onClick={() => setConfig({ ...config, transport: t.val })} style={{
              flex: 1, padding: "12px 8px", borderRadius: 10, border: "none", cursor: "pointer",
              background: config.transport === t.val ? "#059669" : "#f3f4f6",
              color: config.transport === t.val ? "#fff" : "#6b7280",
              fontWeight: 600, fontSize: 13, transition: "all 0.2s"
            }}>{t[lang]}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ItineraryPreview({ lang, itinerary, locked }) {
  if (!itinerary) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {itinerary.map((day, i) => (
        <div key={i} style={{
          background: "#ffffff", borderRadius: 16, padding: 20, border: "1px solid #e5e7eb",
          position: "relative", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
        }}>
          {locked && i > 0 && (
            <div style={{
              position: "absolute", inset: 0, background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 2, flexDirection: "column", gap: 8
            }}>
              <span style={{ fontSize: 32 }}>🔒</span>
              <span style={{ color: "#6b7280", fontSize: 13 }}>
                {lang === "zh" ? "付費解鎖完整行程" : "Unlock full itinerary"}
              </span>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              background: "#059669", color: "#fff", fontWeight: 800, fontSize: 15
            }}>D{i + 1}</div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111827" }}>{day.title}</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {day.items.map((item, j) => (
              <div key={j} style={{
                display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 12px",
                borderRadius: 10, background: "#f9fafb"
              }}>
                <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 600, minWidth: 50, paddingTop: 2 }}>{item.time}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{item.emoji} {item.name}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
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

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleCountryClick = (countryKey) => {
    setSelectedCountry(countryKey);
    setRegionFilter("all");
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
    const selectedAttractions = attractions.filter(a => selected.includes(a._id));
    setTimeout(() => {
      const days = [];
      const perDay = Math.ceil(selectedAttractions.length / config.days);
      for (let d = 0; d < config.days; d++) {
        const dayAttractions = selectedAttractions.slice(d * perDay, (d + 1) * perDay);
        const timeSlots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
        const getName = (a) => lang === "zh" ? a.nameZh : a.nameEn;
        const getDesc = (a) => lang === "zh" ? a.descriptionZh : a.descriptionEn;
        days.push({
          title: lang === "zh"
            ? `第 ${d + 1} 天 — ${dayAttractions[0] ? getName(dayAttractions[0]) : "自由活動"}`
            : `Day ${d + 1} — ${dayAttractions[0] ? getName(dayAttractions[0]) : "Free Time"}`,
          items: dayAttractions.map((a, i) => ({
            time: timeSlots[i] || "TBD",
            emoji: TYPE_EMOJI_FALLBACK[a.type] || "📍",
            name: getName(a),
            note: getDesc(a)
          }))
        });
      }
      setItinerary(days);
      setGenerating(false);
      setStep("itinerary");
    }, 2000);
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
      <div style={{
        minHeight: "100vh", background: "#ffffff",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#6b7280", fontSize: 18,
        fontFamily: "'Outfit', 'Noto Sans TC', sans-serif"
      }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: "100vh", background: "#ffffff",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#ef4444", fontSize: 16,
        fontFamily: "'Outfit', 'Noto Sans TC', sans-serif"
      }}>
        Failed to load data. Please try again later.
      </div>
    );
  }

  // Landing page uses full-page scroll
  if (step === "landing") {
    return (
      <div style={{ fontFamily: "'Outfit', 'Noto Sans TC', sans-serif", color: "#111827" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Noto+Sans+TC:wght@300;400;500;700&display=swap');
          @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          * { box-sizing: border-box; scrollbar-width: thin; scrollbar-color: #d1d5db transparent; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
        `}</style>
        <div style={{ position: "sticky", top: 0, zIndex: 50, background: "#ffffff" }}>
          <Header lang={lang} setLang={setLang} step={step} selectedCountry={selectedCountry} onBack={handleBack} />
        </div>
        <LandingPage
          lang={lang}
          attractions={attractions}
          regions={regions}
          onCountryClick={handleCountryClick}
        />
      </div>
    );
  }

  // Inner pages use contained scroll with bottom CTA
  return (
    <div style={{
      height: "100vh", display: "flex", flexDirection: "column",
      background: "#ffffff", color: "#111827",
      fontFamily: "'Outfit', 'Noto Sans TC', sans-serif",
      position: "relative", overflow: "hidden"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Noto+Sans+TC:wght@300;400;500;700&display=swap');
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        * { box-sizing: border-box; scrollbar-width: thin; scrollbar-color: #d1d5db transparent; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
      `}</style>

      <Header lang={lang} setLang={setLang} step={step} selectedCountry={selectedCountry} onBack={handleBack} />

      {/* Content */}
      <div ref={contentRef} style={{ flex: 1, overflow: "auto", paddingBottom: 100 }}>
        {step === "attractions" && (
          <AttractionsPage
            lang={lang}
            attractions={attractions}
            regions={regions}
            selectedCountry={selectedCountry}
            selected={selected}
            onToggle={toggleSelect}
            regionFilter={regionFilter}
            setRegionFilter={setRegionFilter}
          />
        )}

        {step === "config" && (
          <div style={{ maxWidth: 500, padding: "24px", animation: "slideUp 0.5s ease" }}>
            <h1 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, color: "#111827" }}>
              {lang === "zh" ? "設定旅行條件" : "Set Your Trip Details"}
            </h1>
            <p style={{ margin: "0 0 20px", fontSize: 14, color: "#6b7280" }}>
              {lang === "zh" ? "告訴我們你的旅行偏好" : "Tell us your travel preferences"}
            </p>
            <TripForm lang={lang} config={config} setConfig={setConfig} />
            <div style={{ marginTop: 24, padding: 16, borderRadius: 14, background: "#f9fafb", border: "1px solid #e5e7eb" }}>
              <h4 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 600, color: "#059669" }}>
                {lang === "zh" ? "📋 你選擇的景點" : "📋 Your Selected Spots"}
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {attractions.filter(a => selected.includes(a._id)).map(a => (
                  <span key={a._id} style={{ padding: "4px 10px", borderRadius: 20, background: "#e5e7eb", fontSize: 12, color: "#374151" }}>
                    {TYPE_EMOJI_FALLBACK[a.type] || "📍"} {lang === "zh" ? a.nameZh : a.nameEn}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === "itinerary" && (
          <div style={{ maxWidth: 600, padding: "24px", animation: "slideUp 0.5s ease" }}>
            <h1 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, color: "#111827" }}>
              {lang === "zh" ? "你的專屬行程" : "Your Custom Itinerary"}
            </h1>
            <p style={{ margin: "0 0 20px", fontSize: 14, color: "#6b7280" }}>
              {lang === "zh" ? "根據你的選擇，AI 已生成最佳行程" : "Based on your picks, AI generated the optimal route"}
            </p>
            <ItineraryPreview lang={lang} itinerary={itinerary} locked={true} />
            <div style={{
              marginTop: 24, padding: 20, borderRadius: 16,
              background: "linear-gradient(135deg, #ecfdf5, #eff6ff)", textAlign: "center",
              border: "1px solid #e5e7eb"
            }}>
              <span style={{ fontSize: 32 }}>✨</span>
              <h3 style={{ margin: "8px 0 6px", fontSize: 18, fontWeight: 700, color: "#111827" }}>
                {lang === "zh" ? "解鎖完整行程" : "Unlock Full Itinerary"}
              </h3>
              <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>
                {lang === "zh"
                  ? "包含每日詳細時間表、交通接駁指南、順路景點推薦、餐廳預訂建議"
                  : "Includes daily schedules, transport guides, route optimization, restaurant bookings"}
              </p>
              <button style={{
                marginTop: 16, padding: "12px 32px", borderRadius: 12, border: "none",
                background: "#059669", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer"
              }}>{lang === "zh" ? "NT$299 解鎖" : "$9.99 Unlock"}</button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 24px",
        background: "linear-gradient(transparent, #ffffff 30%)", zIndex: 20, paddingTop: 40
      }}>
        {step === "attractions" && (
          <button onClick={() => setStep("config")} disabled={selected.length === 0} style={{
            width: "100%", padding: "16px", borderRadius: 14, border: "none",
            cursor: selected.length > 0 ? "pointer" : "not-allowed",
            background: selected.length > 0 ? "#059669" : "#e5e7eb",
            color: selected.length > 0 ? "#fff" : "#9ca3af",
            fontWeight: 800, fontSize: 16, transition: "all 0.3s"
          }}>{lang === "zh" ? `繼續 — 已選 ${selected.length} 個景點` : `Continue — ${selected.length} spots selected`}</button>
        )}
        {step === "config" && (
          <button onClick={generateItinerary} disabled={generating} style={{
            width: "100%", padding: "16px", borderRadius: 14, border: "none", cursor: "pointer",
            background: generating ? "#e5e7eb" : "#059669",
            color: generating ? "#9ca3af" : "#fff",
            fontWeight: 800, fontSize: 16, animation: generating ? "pulse 1.5s infinite" : "none"
          }}>{generating
            ? (lang === "zh" ? "🤖 AI 正在規劃中..." : "🤖 AI is planning...")
            : (lang === "zh" ? "🚀 生成我的專屬行程" : "🚀 Generate My Itinerary")}</button>
        )}
        {step === "itinerary" && (
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => { setStep("attractions"); setItinerary(null); setSelected([]); }} style={{
              padding: "16px 20px", borderRadius: 14, border: "1px solid #e5e7eb",
              background: "#f9fafb", color: "#6b7280", cursor: "pointer", fontWeight: 600, fontSize: 14
            }}>{lang === "zh" ? "重新選擇" : "Reselect"}</button>
            <button onClick={() => alert(lang === "zh" ? "付費功能開發中！" : "Payment coming soon!")} style={{
              flex: 1, padding: "16px", borderRadius: 14, border: "none", cursor: "pointer",
              background: "#059669", color: "#fff", fontWeight: 800, fontSize: 16
            }}>{lang === "zh" ? "💎 解鎖完整行程 NT$299" : "💎 Unlock Full Itinerary $9.99"}</button>
          </div>
        )}
      </div>
    </div>
  );
}
