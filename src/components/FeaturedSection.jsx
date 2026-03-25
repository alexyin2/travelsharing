import { TYPE_COLORS, TYPE_EMOJI_FALLBACK, COUNTRY_CONFIG } from "../lib/constants";

export default function FeaturedSection({ attractions, lang, onCountryClick }) {
  // Pick up to 8 attractions with images, spread across countries
  const featured = (() => {
    const byCountry = {};
    attractions.forEach(a => {
      if (!a.cardImageUrl) return;
      const country = a.region?.country;
      if (!country) return;
      if (!byCountry[country]) byCountry[country] = [];
      byCountry[country].push(a);
    });
    const result = [];
    const countries = Object.keys(byCountry);
    let idx = 0;
    while (result.length < 8 && idx < 20) {
      for (const c of countries) {
        if (byCountry[c][idx] && result.length < 8) {
          result.push({ ...byCountry[c][idx], _country: c });
        }
      }
      idx++;
    }
    return result;
  })();

  if (featured.length === 0) return null;

  return (
    <div style={{ padding: "60px 0", background: "#f9fafb" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#111827", textAlign: "center", letterSpacing: "-0.02em" }}>
          {lang === "zh" ? "精選景點推薦" : "Featured Attractions"}
        </h2>
        <p style={{ margin: "8px 0 32px", fontSize: 15, color: "#6b7280", textAlign: "center" }}>
          {lang === "zh" ? "來自世界各地的精選旅遊景點" : "Handpicked destinations from around the world"}
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20
        }}>
          {featured.map(a => {
            const tc = TYPE_COLORS[a.type] || TYPE_COLORS.nature;
            const emoji = TYPE_EMOJI_FALLBACK[a.type] || "📍";
            const cfg = COUNTRY_CONFIG[a._country];
            const name = lang === "zh" ? a.nameZh : a.nameEn;
            const rawDesc = lang === "zh" ? a.descriptionZh : a.descriptionEn;
            const desc = rawDesc && rawDesc.length > 40 ? rawDesc.slice(0, 40) + "..." : rawDesc;

            return (
              <div
                key={a._id}
                onClick={() => onCountryClick(a._country)}
                style={{
                  borderRadius: 12, overflow: "hidden", cursor: "pointer",
                  background: "#ffffff", border: "1px solid #e5e7eb",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  transition: "all 0.3s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
                }}
              >
                <div style={{ position: "relative", height: 150, overflow: "hidden" }}>
                  <img
                    src={a.cardImageUrl + "?w=400&h=250&fit=crop"}
                    alt={name}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", top: 8, left: 8 }}>
                    <span style={{
                      background: tc.bg + "dd", color: tc.text, padding: "3px 8px", borderRadius: 12,
                      fontSize: 10, fontWeight: 600, backdropFilter: "blur(8px)"
                    }}>{tc.label}</span>
                  </div>
                  {cfg && (
                    <div style={{ position: "absolute", top: 8, right: 8, fontSize: 18 }}>
                      {cfg.emoji}
                    </div>
                  )}
                </div>
                <div style={{ padding: "10px 14px 14px" }}>
                  <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#111827" }}>
                    {emoji} {name}
                  </h4>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#6b7280", lineHeight: 1.4 }}>{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
