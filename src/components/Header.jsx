import { COUNTRY_CONFIG } from "../lib/constants";

export default function Header({ lang, setLang, step, selectedCountry, onBack }) {
  const showBack = step !== "landing";
  const cfg = selectedCountry ? COUNTRY_CONFIG[selectedCountry] : null;

  return (
    <div style={{
      padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center",
      borderBottom: "1px solid #e5e7eb", position: "relative", zIndex: 10, background: "#ffffff"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {showBack && (
          <button onClick={onBack} style={{
            padding: "6px 12px", borderRadius: 8, border: "1px solid #e5e7eb",
            background: "#f9fafb", color: "#374151", cursor: "pointer", fontSize: 14, fontWeight: 600,
            marginRight: 8, display: "flex", alignItems: "center"
          }}>
            ←
          </button>
        )}
        {showBack && cfg ? (
          <span style={{ fontSize: 18, fontWeight: 700, color: "#111827", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 22 }}>{cfg.emoji}</span>
            {lang === "zh" ? cfg.zhName : selectedCountry}
          </span>
        ) : (
          <>
            <span style={{ fontSize: 24 }}>✈️</span>
            <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em", color: "#111827" }}>
              AlexTravelSharing
            </span>
          </>
        )}
      </div>
      <button onClick={() => setLang(l => l === "zh" ? "en" : "zh")} style={{
        padding: "6px 14px", borderRadius: 20, border: "1px solid #e5e7eb", background: "#f9fafb",
        color: "#6b7280", cursor: "pointer", fontSize: 12, fontWeight: 600
      }}>{lang === "zh" ? "EN" : "中文"}</button>
    </div>
  );
}
