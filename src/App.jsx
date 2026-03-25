import { useState, useEffect, useRef, useMemo } from "react";
import { useSanityData } from "./hooks/useSanityData";

const TYPE_COLORS = {
  nature: { bg: "#0f4c3a", text: "#6ee7b7", label: "自然景觀" },
  village: { bg: "#4a2c17", text: "#fbbf24", label: "漁村小鎮" },
  accommodation: { bg: "#3b1f4a", text: "#c4b5fd", label: "特色住宿" },
  restaurant: { bg: "#4a1d1d", text: "#fca5a5", label: "美食餐廳" },
  activity: { bg: "#1e3a5f", text: "#7dd3fc", label: "體驗活動" },
  town: { bg: "#374151", text: "#d1d5db", label: "城鎮市區" },
  aurora_spot: { bg: "#1a1a3e", text: "#a78bfa", label: "極光觀測" },
  landmark: { bg: "#3d2e1f", text: "#fcd34d", label: "地標景點" },
  hiking: { bg: "#1a3a2a", text: "#86efac", label: "登山步道" },
  viewpoint: { bg: "#2d2d4e", text: "#93c5fd", label: "觀景台" },
  museum: { bg: "#3d2e1f", text: "#fcd34d", label: "博物館" },
  market: { bg: "#4a2c17", text: "#fbbf24", label: "市集" },
  palace: { bg: "#3b1f4a", text: "#c4b5fd", label: "宮殿" },
  park: { bg: "#0f4c3a", text: "#6ee7b7", label: "公園" },
  gallery: { bg: "#3b1f4a", text: "#c4b5fd", label: "藝廊" },
  theatre: { bg: "#4a1d1d", text: "#fca5a5", label: "劇院" },
  shopping: { bg: "#4a2c17", text: "#fbbf24", label: "購物" },
  neighborhood: { bg: "#374151", text: "#d1d5db", label: "街區" },
  day_trip: { bg: "#1e3a5f", text: "#7dd3fc", label: "一日遊" },
  beach: { bg: "#1e3a5f", text: "#7dd3fc", label: "海灘" },
  lake: { bg: "#1a1a3e", text: "#a78bfa", label: "湖泊" },
  glacier: { bg: "#2d2d4e", text: "#93c5fd", label: "冰川" },
};

const TYPE_EMOJI_FALLBACK = {
  nature: "🏔️",
  village: "🏘️",
  accommodation: "🛖",
  restaurant: "🍽️",
  activity: "🎿",
  town: "🏙️",
  aurora_spot: "🌌",
  landmark: "⛪",
  hiking: "🥾",
  viewpoint: "📸",
  museum: "🏛️",
  market: "🏪",
  palace: "👑",
  park: "🌳",
  gallery: "🎨",
  theatre: "🎭",
  lake: "🧊",
  glacier: "🧊",
  beach: "🏖️",
  shopping: "🛍️",
  neighborhood: "🏘️",
  day_trip: "🚐",
};

const COUNTRY_CONFIG = {
  Norway: {
    emoji: "🇳🇴", color: "#6ee7b7", bg: "#064e3b", zhName: "挪威",
    description: { zh: "極光、峽灣、漁村與壯闊的北歐自然", en: "Aurora, fjords, fishing villages & Nordic nature" }
  },
  "United Kingdom": {
    emoji: "🇬🇧", color: "#fbbf24", bg: "#78350f", zhName: "英國",
    description: { zh: "皇宮、博物館、劇院與歷史街區", en: "Palaces, museums, theatres & historic neighborhoods" }
  },
  "NZ South Island": {
    emoji: "🇳🇿", color: "#86efac", bg: "#14532d", zhName: "紐西蘭南島",
    description: { zh: "冰川、湖泊、步道與壯麗自然景觀", en: "Glaciers, lakes, trails & dramatic landscapes" }
  },
};

const STEP_ORDER = ["landing", "destinationPicker", "attractions", "config", "itinerary"];

function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i, left: Math.random() * 100, top: Math.random() * 100,
    size: Math.random() * 2 + 0.5, delay: Math.random() * 5, dur: Math.random() * 3 + 2
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.4 }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position: "absolute", left: `${s.left}%`, top: `${s.top}%`,
          width: s.size, height: s.size, borderRadius: "50%", background: "#fff",
          animation: `twinkle ${s.dur}s ${s.delay}s infinite ease-in-out`
        }} />
      ))}
    </div>
  );
}

function AttractionCard({ item, lang, selected, onToggle }) {
  const tc = TYPE_COLORS[item.type] || TYPE_COLORS.nature;
  const isSelected = selected.includes(item._id);
  const emoji = TYPE_EMOJI_FALLBACK[item.type] || "📍";
  const name = lang === "zh" ? item.nameZh : item.nameEn;
  const rawDesc = lang === "zh" ? item.descriptionZh : item.descriptionEn;
  const desc = rawDesc && rawDesc.length > 50 ? rawDesc.slice(0, 50) + "..." : rawDesc;
  const tip = lang === "zh" ? item.insiderTipZh : item.insiderTipEn;
  const regionName = item.region ? (lang === "zh" ? item.region.nameZh : item.region.nameEn) : "";
  const duration = item.suggestedDuration;

  return (
    <div onClick={() => onToggle(item._id)} style={{
      position: "relative", borderRadius: 16, overflow: "hidden", cursor: "pointer",
      border: isSelected ? "2px solid #6ee7b7" : "2px solid transparent",
      boxShadow: isSelected ? "0 0 24px rgba(110,231,183,0.3)" : "0 4px 20px rgba(0,0,0,0.3)",
      transition: "all 0.3s ease", transform: isSelected ? "scale(1.02)" : "scale(1)",
      background: "#111827"
    }}>
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        {item.cardImageUrl ? (
          <img src={item.cardImageUrl} alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: isSelected ? "brightness(0.7)" : "brightness(0.6)" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1e293b, #0f172a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>
            {emoji}
          </div>
        )}
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 8 }}>
          <span style={{
            background: tc.bg, color: tc.text, padding: "4px 10px", borderRadius: 20,
            fontSize: 11, fontWeight: 600, backdropFilter: "blur(8px)", border: `1px solid ${tc.text}33`
          }}>{tc.label}</span>
        </div>
        <div style={{ position: "absolute", top: 12, right: 12 }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            background: isSelected ? "#6ee7b7" : "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
            transition: "all 0.3s", color: isSelected ? "#064e3b" : "#fff", fontSize: 16, fontWeight: 700
          }}>{isSelected ? "✓" : "+"}</div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px 16px 12px",
          background: "linear-gradient(transparent, rgba(0,0,0,0.85))" }}>
          <div style={{ fontSize: 22, marginBottom: 2 }}>{emoji}</div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#f9fafb", letterSpacing: "-0.02em" }}>
            {name}
          </h3>
        </div>
      </div>
      <div style={{ padding: "12px 16px 16px" }}>
        <p style={{ margin: 0, fontSize: 13, color: "#9ca3af", lineHeight: 1.5 }}>{desc}</p>
        <div style={{ display: "flex", gap: 12, marginTop: 10, fontSize: 11, color: "#6b7280" }}>
          {duration && <span>⏱ {duration >= 60 ? `${Math.round(duration / 60)}h` : `${duration}min`}</span>}
          {regionName && <span>📍 {regionName}</span>}
        </div>
        {tip && (
          <div style={{ marginTop: 10, padding: "8px 10px", borderRadius: 8, background: "#1f2937", fontSize: 12, color: "#d1d5db", lineHeight: 1.4 }}>
            💡 {tip}
          </div>
        )}
      </div>
    </div>
  );
}

function TripForm({ lang, config, setConfig }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <label style={{ display: "block", fontSize: 13, color: "#9ca3af", marginBottom: 6, fontWeight: 500 }}>
          {lang === "zh" ? "旅行天數" : "Trip Duration"}
        </label>
        <div style={{ display: "flex", gap: 8 }}>
          {[3, 4, 5, 6, 7].map(d => (
            <button key={d} onClick={() => setConfig({ ...config, days: d })} style={{
              flex: 1, padding: "12px 0", borderRadius: 10, border: "none", cursor: "pointer",
              background: config.days === d ? "#6ee7b7" : "#1f2937",
              color: config.days === d ? "#064e3b" : "#9ca3af",
              fontWeight: 700, fontSize: 15, transition: "all 0.2s"
            }}>{d} {lang === "zh" ? "天" : "days"}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={{ display: "block", fontSize: 13, color: "#9ca3af", marginBottom: 6, fontWeight: 500 }}>
            {lang === "zh" ? "抵達時間" : "Arrival Time"}
          </label>
          <select value={config.arrival} onChange={e => setConfig({ ...config, arrival: e.target.value })}
            style={{ width: "100%", padding: "12px", borderRadius: 10, border: "1px solid #374151",
              background: "#1f2937", color: "#f9fafb", fontSize: 14, appearance: "none" }}>
            <option value="morning">{lang === "zh" ? "上午 (06-12)" : "Morning (06-12)"}</option>
            <option value="afternoon">{lang === "zh" ? "下午 (12-18)" : "Afternoon (12-18)"}</option>
            <option value="evening">{lang === "zh" ? "晚上 (18-24)" : "Evening (18-24)"}</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, color: "#9ca3af", marginBottom: 6, fontWeight: 500 }}>
            {lang === "zh" ? "離開時間" : "Departure Time"}
          </label>
          <select value={config.departure} onChange={e => setConfig({ ...config, departure: e.target.value })}
            style={{ width: "100%", padding: "12px", borderRadius: 10, border: "1px solid #374151",
              background: "#1f2937", color: "#f9fafb", fontSize: 14, appearance: "none" }}>
            <option value="morning">{lang === "zh" ? "上午 (06-12)" : "Morning (06-12)"}</option>
            <option value="afternoon">{lang === "zh" ? "下午 (12-18)" : "Afternoon (12-18)"}</option>
            <option value="evening">{lang === "zh" ? "晚上 (18-24)" : "Evening (18-24)"}</option>
          </select>
        </div>
      </div>
      <div>
        <label style={{ display: "block", fontSize: 13, color: "#9ca3af", marginBottom: 6, fontWeight: 500 }}>
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
              background: config.transport === t.val ? "#6ee7b7" : "#1f2937",
              color: config.transport === t.val ? "#064e3b" : "#9ca3af",
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
          background: "#111827", borderRadius: 16, padding: 20, border: "1px solid #1f2937",
          position: "relative", overflow: "hidden"
        }}>
          {locked && i > 0 && (
            <div style={{
              position: "absolute", inset: 0, background: "rgba(17,24,39,0.85)",
              backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 2, flexDirection: "column", gap: 8
            }}>
              <span style={{ fontSize: 32 }}>🔒</span>
              <span style={{ color: "#9ca3af", fontSize: 13 }}>
                {lang === "zh" ? "付費解鎖完整行程" : "Unlock full itinerary"}
              </span>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg, #6ee7b7, #3b82f6)", color: "#fff", fontWeight: 800, fontSize: 15
            }}>D{i + 1}</div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#f9fafb" }}>{day.title}</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {day.items.map((item, j) => (
              <div key={j} style={{
                display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 12px",
                borderRadius: 10, background: "#1f2937"
              }}>
                <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, minWidth: 50, paddingTop: 2 }}>{item.time}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#f9fafb" }}>{item.emoji} {item.name}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{item.note}</div>
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
  const [selected, setSelected] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [regionFilter, setRegionFilter] = useState("all");
  const [config, setConfig] = useState({ days: 5, arrival: "morning", departure: "morning", transport: "mixed" });
  const [generating, setGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const contentRef = useRef(null);

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const destinationGroups = useMemo(() => {
    const groups = {};
    regions.forEach(region => {
      const country = region.country || "Other";
      if (!groups[country]) groups[country] = { regions: [], attractionCount: 0 };
      const count = attractions.filter(a => a.region?.slug === region.slug).length;
      groups[country].regions.push({ ...region, attractionCount: count });
      groups[country].attractionCount += count;
    });
    return groups;
  }, [regions, attractions]);

  const filtered = attractions.filter(a => {
    const regionPool = selectedRegions.length > 0
      ? selectedRegions
      : (regionFilter === "all" ? null : [regionFilter]);
    if (!regionPool) return true;
    return regionPool.includes(a.region?.slug);
  });

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
    if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#f9fafb",
        fontSize: 18,
      }}>
        Loading attractions...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ef4444",
        fontSize: 16,
      }}>
        Failed to load data. Please try again later.
      </div>
    );
  }

  const titles = {
    landing: { zh: "AlexTravelSharing", en: "AlexTravelSharing" },
    destinationPicker: { zh: "選擇目的地區域", en: "Choose Your Destinations" },
    attractions: { zh: "選擇你的夢想景點", en: "Choose Your Dream Spots" },
    config: { zh: "設定旅行條件", en: "Set Your Trip Details" },
    itinerary: { zh: "你的專屬行程", en: "Your Custom Itinerary" },
  };

  const subtitles = {
    landing: { zh: "真實旅行故事，AI 智能規劃", en: "Real travel stories, AI-powered planning" },
    destinationPicker: { zh: "選擇想探索的區域，可跨國多選", en: "Select regions to explore, multi-select across countries" },
    attractions: { zh: `已選擇 ${selected.length} 個景點`, en: `${selected.length} destinations selected` },
    config: { zh: "告訴我們你的旅行偏好", en: "Tell us your travel preferences" },
    itinerary: { zh: "根據你的選擇，AI 已生成最佳行程", en: "Based on your picks, AI generated the optimal route" },
  };

  const stepIndex = STEP_ORDER.indexOf(step);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#030712", color: "#f9fafb", fontFamily: "'Outfit', 'Noto Sans TC', sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Noto+Sans+TC:wght@300;400;500;700&display=swap');
        @keyframes twinkle { 0%,100% { opacity: 0.2; } 50% { opacity: 1; } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 20px rgba(110,231,183,0.3); } 50% { box-shadow: 0 0 40px rgba(110,231,183,0.6); } }
        * { box-sizing: border-box; scrollbar-width: thin; scrollbar-color: #374151 transparent; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #374151; border-radius: 3px; }
        select option { background: #1f2937; color: #f9fafb; }
      `}</style>
      <Stars />

      {/* Header */}
      <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1f293766", position: "relative", zIndex: 10, backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }}>✈️</span>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em", background: "linear-gradient(135deg, #6ee7b7, #7dd3fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            AlexTravelSharing
          </span>
        </div>
        <button onClick={() => setLang(l => l === "zh" ? "en" : "zh")} style={{
          padding: "6px 14px", borderRadius: 20, border: "1px solid #374151", background: "#111827",
          color: "#9ca3af", cursor: "pointer", fontSize: 12, fontWeight: 600
        }}>{lang === "zh" ? "EN" : "中文"}</button>
      </div>

      {/* Progress */}
      <div style={{ padding: "12px 24px", display: "flex", gap: 6, position: "relative", zIndex: 10 }}>
        {STEP_ORDER.map((s, i) => (
          <div key={s} style={{
            flex: 1, height: 3, borderRadius: 2, transition: "all 0.5s",
            background: i <= stepIndex ? "linear-gradient(90deg, #6ee7b7, #3b82f6)" : "#1f2937"
          }} />
        ))}
      </div>

      {/* Title */}
      <div style={{ padding: "8px 24px 16px", position: "relative", zIndex: 10 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", animation: "slideUp 0.5s ease" }}>
          {titles[step][lang]}
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: 14, color: "#6b7280" }}>{subtitles[step][lang]}</p>
      </div>

      {/* Content */}
      <div ref={contentRef} style={{ flex: 1, overflow: "auto", padding: "0 24px 120px", position: "relative", zIndex: 10 }}>
        {/* Step: Landing */}
        {step === "landing" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideUp 0.6s ease" }}>
            <div style={{ textAlign: "center", padding: "20px 0 0" }}>
              <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #6ee7b7, #7dd3fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                AlexTravelSharing
              </h2>
              <p style={{ margin: "8px 0 0", fontSize: 15, color: "#9ca3af" }}>
                {lang === "zh" ? "真實旅行故事，AI 智能規劃" : "Real travel stories, AI-powered planning"}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {Object.entries(COUNTRY_CONFIG).map(([countryKey, cfg]) => {
                const count = destinationGroups[countryKey]?.attractionCount || 0;
                return (
                  <div key={countryKey} style={{
                    borderRadius: 16, padding: 20, background: `linear-gradient(135deg, ${cfg.bg}, #111827)`,
                    border: `1px solid ${cfg.color}33`, display: "flex", alignItems: "center", gap: 16, transition: "all 0.3s"
                  }}>
                    <span style={{ fontSize: 40 }}>{cfg.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: cfg.color }}>
                        {lang === "zh" ? cfg.zhName : countryKey}
                      </h3>
                      <p style={{ margin: "4px 0 0", fontSize: 13, color: "#9ca3af", lineHeight: 1.4 }}>
                        {cfg.description[lang]}
                      </p>
                      <span style={{ fontSize: 12, color: "#6b7280", marginTop: 4, display: "inline-block" }}>
                        {count} {lang === "zh" ? "個景點" : "attractions"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[
                { emoji: "📍", zh: "精選景點", en: "Attractions", num: `${attractions.length}` },
                { emoji: "🌍", zh: "目的地", en: "Destinations", num: "3" },
                { emoji: "🤖", zh: "AI 行程", en: "AI Itinerary", num: "∞" },
              ].map((f, i) => (
                <div key={i} style={{ background: "#111827", borderRadius: 14, padding: "16px 12px", textAlign: "center", border: "1px solid #1f2937" }}>
                  <div style={{ fontSize: 28 }}>{f.emoji}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#6ee7b7", marginTop: 4 }}>{f.num}</div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{f[lang]}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step: Destination Picker */}
        {step === "destinationPicker" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "slideUp 0.5s ease" }}>
            {Object.entries(destinationGroups).map(([country, group]) => {
              const cfg = COUNTRY_CONFIG[country] || { emoji: "🌍", color: "#9ca3af", bg: "#1f2937", zhName: country };
              const allSlugs = group.regions.map(r => r.slug);
              const allSelected = allSlugs.length > 0 && allSlugs.every(s => selectedRegions.includes(s));

              return (
                <div key={country} style={{ borderRadius: 16, background: "#111827", border: "1px solid #1f2937", overflow: "hidden" }}>
                  <div style={{
                    padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: `linear-gradient(135deg, ${cfg.bg}, #111827)`, borderBottom: "1px solid #1f293766"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 28 }}>{cfg.emoji}</span>
                      <div>
                        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: cfg.color }}>
                          {lang === "zh" ? (cfg.zhName || country) : country}
                        </h3>
                        <span style={{ fontSize: 12, color: "#6b7280" }}>
                          {group.attractionCount} {lang === "zh" ? "個景點" : "attractions"}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => {
                      if (allSelected) {
                        setSelectedRegions(prev => prev.filter(s => !allSlugs.includes(s)));
                      } else {
                        setSelectedRegions(prev => [...new Set([...prev, ...allSlugs])]);
                      }
                    }} style={{
                      padding: "6px 14px", borderRadius: 20, border: `1px solid ${cfg.color}66`,
                      background: allSelected ? cfg.color : "transparent",
                      color: allSelected ? "#030712" : cfg.color,
                      cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all 0.2s"
                    }}>
                      {allSelected
                        ? (lang === "zh" ? "取消全選" : "Deselect All")
                        : (lang === "zh" ? "全選" : "Select All")}
                    </button>
                  </div>

                  <div style={{ padding: "12px 16px", display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {group.regions.map(region => {
                      const isSelected = selectedRegions.includes(region.slug);
                      return (
                        <button key={region.slug} onClick={() => {
                          setSelectedRegions(prev =>
                            isSelected ? prev.filter(s => s !== region.slug) : [...prev, region.slug]
                          );
                        }} style={{
                          padding: "8px 14px", borderRadius: 20, border: "none", cursor: "pointer",
                          background: isSelected ? cfg.color : "#1f2937",
                          color: isSelected ? "#030712" : "#9ca3af",
                          fontWeight: 600, fontSize: 13, transition: "all 0.2s"
                        }}>
                          {lang === "zh" ? region.nameZh : region.nameEn} ({region.attractionCount})
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Step: Attraction Selection */}
        {step === "attractions" && (
          <div style={{ animation: "slideUp 0.5s ease" }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
              <button onClick={() => setRegionFilter("all")} style={{
                padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer",
                background: regionFilter === "all" ? "#6ee7b7" : "#1f2937",
                color: regionFilter === "all" ? "#064e3b" : "#9ca3af",
                fontWeight: 600, fontSize: 13
              }}>{lang === "zh" ? "全部" : "All"}</button>
              {Object.entries(destinationGroups).map(([country, group]) => {
                const cfg = COUNTRY_CONFIG[country] || { emoji: "🌍" };
                const visibleRegions = selectedRegions.length > 0
                  ? group.regions.filter(r => selectedRegions.includes(r.slug))
                  : group.regions;
                if (visibleRegions.length === 0) return null;
                return visibleRegions.map(r => (
                  <button key={r.slug} onClick={() => setRegionFilter(r.slug)} style={{
                    padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer",
                    background: regionFilter === r.slug ? "#6ee7b7" : "#1f2937",
                    color: regionFilter === r.slug ? "#064e3b" : "#9ca3af",
                    fontWeight: 600, fontSize: 13, transition: "all 0.2s"
                  }}>
                    {cfg.emoji} {lang === "zh" ? r.nameZh : r.nameEn} ({r.attractionCount})
                  </button>
                ));
              })}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {filtered.map(a => (
                <AttractionCard key={a._id} item={a} lang={lang} selected={selected} onToggle={toggleSelect} />
              ))}
            </div>
          </div>
        )}

        {/* Step: Config */}
        {step === "config" && (
          <div style={{ maxWidth: 500, animation: "slideUp 0.5s ease" }}>
            <TripForm lang={lang} config={config} setConfig={setConfig} />
            <div style={{ marginTop: 24, padding: 16, borderRadius: 14, background: "#111827", border: "1px solid #1f2937" }}>
              <h4 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 600, color: "#6ee7b7" }}>
                {lang === "zh" ? "📋 你選擇的景點" : "📋 Your Selected Spots"}
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {attractions.filter(a => selected.includes(a._id)).map(a => (
                  <span key={a._id} style={{ padding: "4px 10px", borderRadius: 20, background: "#1f2937", fontSize: 12, color: "#d1d5db" }}>
                    {TYPE_EMOJI_FALLBACK[a.type] || "📍"} {lang === "zh" ? a.nameZh : a.nameEn}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step: Itinerary */}
        {step === "itinerary" && (
          <div style={{ maxWidth: 600, animation: "slideUp 0.5s ease" }}>
            <ItineraryPreview lang={lang} itinerary={itinerary} locked={true} />
            <div style={{ marginTop: 24, padding: 20, borderRadius: 16, background: "linear-gradient(135deg, #064e3b, #1e3a5f)", textAlign: "center" }}>
              <span style={{ fontSize: 32 }}>✨</span>
              <h3 style={{ margin: "8px 0 6px", fontSize: 18, fontWeight: 700 }}>
                {lang === "zh" ? "解鎖完整行程" : "Unlock Full Itinerary"}
              </h3>
              <p style={{ margin: 0, fontSize: 13, color: "#9ca3af" }}>
                {lang === "zh"
                  ? "包含每日詳細時間表、交通接駁指南、順路景點推薦、餐廳預訂建議"
                  : "Includes daily schedules, transport guides, route optimization, restaurant bookings"}
              </p>
              <button style={{
                marginTop: 16, padding: "12px 32px", borderRadius: 12, border: "none",
                background: "#6ee7b7", color: "#064e3b", fontWeight: 700, fontSize: 15, cursor: "pointer"
              }}>{lang === "zh" ? "NT$299 解鎖" : "$9.99 Unlock"}</button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 24px",
        background: "linear-gradient(transparent, #030712 30%)", zIndex: 20, paddingTop: 40
      }}>
        {step === "landing" && (
          <button onClick={() => setStep("destinationPicker")} style={{
            width: "100%", padding: "16px", borderRadius: 14, border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #6ee7b7, #3b82f6)", color: "#030712",
            fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em", animation: "glow 2s infinite"
          }}>{lang === "zh" ? "開始規劃我的旅行 →" : "Start Planning My Trip →"}</button>
        )}
        {step === "destinationPicker" && (
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setStep("landing")} style={{
              padding: "16px 20px", borderRadius: 14, border: "1px solid #374151",
              background: "#111827", color: "#9ca3af", cursor: "pointer", fontWeight: 600, fontSize: 14
            }}>←</button>
            <button onClick={() => setStep("attractions")} style={{
              flex: 1, padding: "16px", borderRadius: 14, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #6ee7b7, #3b82f6)", color: "#030712",
              fontWeight: 800, fontSize: 16, transition: "all 0.3s"
            }}>
              {selectedRegions.length > 0
                ? (lang === "zh" ? `繼續 — 已選 ${selectedRegions.length} 個區域` : `Continue — ${selectedRegions.length} regions`)
                : (lang === "zh" ? "跳過，瀏覽全部景點 →" : "Skip, browse all →")}
            </button>
          </div>
        )}
        {step === "attractions" && (
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setStep("destinationPicker")} style={{
              padding: "16px 20px", borderRadius: 14, border: "1px solid #374151",
              background: "#111827", color: "#9ca3af", cursor: "pointer", fontWeight: 600, fontSize: 14
            }}>←</button>
            <button onClick={() => setStep("config")} disabled={selected.length === 0} style={{
              flex: 1, padding: "16px", borderRadius: 14, border: "none", cursor: selected.length > 0 ? "pointer" : "not-allowed",
              background: selected.length > 0 ? "linear-gradient(135deg, #6ee7b7, #3b82f6)" : "#374151",
              color: selected.length > 0 ? "#030712" : "#6b7280",
              fontWeight: 800, fontSize: 16, transition: "all 0.3s"
            }}>{lang === "zh" ? `繼續 — 已選 ${selected.length} 個景點` : `Continue — ${selected.length} spots selected`}</button>
          </div>
        )}
        {step === "config" && (
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setStep("attractions")} style={{
              padding: "16px 20px", borderRadius: 14, border: "1px solid #374151",
              background: "#111827", color: "#9ca3af", cursor: "pointer", fontWeight: 600, fontSize: 14
            }}>←</button>
            <button onClick={generateItinerary} disabled={generating} style={{
              flex: 1, padding: "16px", borderRadius: 14, border: "none", cursor: "pointer",
              background: generating ? "#374151" : "linear-gradient(135deg, #6ee7b7, #3b82f6)",
              color: generating ? "#6b7280" : "#030712",
              fontWeight: 800, fontSize: 16, animation: generating ? "pulse 1.5s infinite" : "none"
            }}>{generating
              ? (lang === "zh" ? "🤖 AI 正在規劃中..." : "🤖 AI is planning...")
              : (lang === "zh" ? "🚀 生成我的專屬行程" : "🚀 Generate My Itinerary")}</button>
          </div>
        )}
        {step === "itinerary" && (
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => { setStep("attractions"); setItinerary(null); setSelectedRegions([]); setSelected([]); }} style={{
              padding: "16px 20px", borderRadius: 14, border: "1px solid #374151",
              background: "#111827", color: "#9ca3af", cursor: "pointer", fontWeight: 600, fontSize: 14
            }}>{lang === "zh" ? "重新選擇" : "Reselect"}</button>
            <button onClick={() => alert(lang === "zh" ? "付費功能開發中！" : "Payment coming soon!")} style={{
              flex: 1, padding: "16px", borderRadius: 14, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #6ee7b7, #3b82f6)", color: "#030712",
              fontWeight: 800, fontSize: 16
            }}>{lang === "zh" ? "💎 解鎖完整行程 NT$299" : "💎 Unlock Full Itinerary $9.99"}</button>
          </div>
        )}
      </div>
    </div>
  );
}
