export default function StatsBar({ attractionCount, lang }) {
  const stats = [
    { num: `${attractionCount}`, zh: "精選景點", en: "Attractions", icon: "📍" },
    { num: "3", zh: "目的地", en: "Destinations", icon: "🌍" },
    { num: "∞", zh: "AI 行程", en: "AI Itineraries", icon: "🤖" },
  ];

  return (
    <div style={{ padding: "40px 0", background: "#f9fafb" }}>
      <div style={{
        maxWidth: 800, margin: "0 auto", padding: "0 24px",
        display: "flex", justifyContent: "center", gap: 60
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28 }}>{s.icon}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#059669", marginTop: 4 }}>{s.num}</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>{s[lang]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
