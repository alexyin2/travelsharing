import { TYPE_COLORS, TYPE_EMOJI_FALLBACK } from "../lib/constants";

export default function AttractionCard({ item, lang, selected, onToggle }) {
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
      border: isSelected ? "2px solid #059669" : "2px solid #e5e7eb",
      boxShadow: isSelected ? "0 0 0 3px rgba(5,150,105,0.2)" : "0 1px 3px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease", transform: isSelected ? "scale(1.02)" : "scale(1)",
      background: "#ffffff"
    }}>
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        {item.cardImageUrl ? (
          <img src={item.cardImageUrl + "?w=400&h=300&fit=crop"} alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: isSelected ? "brightness(0.8)" : "brightness(0.7)" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #e5e7eb, #d1d5db)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>
            {emoji}
          </div>
        )}
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 8 }}>
          <span style={{
            background: tc.bg + "dd", color: tc.text, padding: "4px 10px", borderRadius: 20,
            fontSize: 11, fontWeight: 600, backdropFilter: "blur(8px)", border: `1px solid ${tc.text}33`
          }}>{tc.label}</span>
        </div>
        <div style={{ position: "absolute", top: 12, right: 12 }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            background: isSelected ? "#059669" : "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)",
            transition: "all 0.3s", color: isSelected ? "#fff" : "#fff", fontSize: 16, fontWeight: 700
          }}>{isSelected ? "✓" : "+"}</div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px 16px 12px",
          background: "linear-gradient(transparent, rgba(0,0,0,0.85))" }}>
          <div style={{ fontSize: 22, marginBottom: 2 }}>{emoji}</div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
            {name}
          </h3>
        </div>
      </div>
      <div style={{ padding: "12px 16px 16px" }}>
        <p style={{ margin: 0, fontSize: 13, color: "#4b5563", lineHeight: 1.5 }}>{desc}</p>
        <div style={{ display: "flex", gap: 12, marginTop: 10, fontSize: 11, color: "#9ca3af" }}>
          {duration && <span>⏱ {duration >= 60 ? `${Math.round(duration / 60)}h` : `${duration}min`}</span>}
          {regionName && <span>📍 {regionName}</span>}
        </div>
        {tip && (
          <div style={{ marginTop: 10, padding: "8px 10px", borderRadius: 8, background: "#f0fdf4", fontSize: 12, color: "#374151", lineHeight: 1.4 }}>
            💡 {tip}
          </div>
        )}
      </div>
    </div>
  );
}
