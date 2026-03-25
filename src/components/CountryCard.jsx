import useImageCarousel from "../hooks/useImageCarousel";

export default function CountryCard({ countryKey, config, images, attractionCount, lang, onClick, delay }) {
  const currentIndex = useImageCarousel(images, 4000, delay || 0);

  return (
    <div onClick={onClick} style={{
      borderRadius: 16, overflow: "hidden", cursor: "pointer",
      border: "1px solid #e5e7eb", background: "#ffffff",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      transition: "all 0.3s ease",
      display: "flex", flexDirection: "column",
      minHeight: 420,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
    }}
    >
      {/* Image carousel area */}
      <div style={{ position: "relative", height: 260, overflow: "hidden", background: "#f3f4f6" }}>
        {images && images.length > 0 ? images.map((url, i) => (
          <img
            key={url}
            src={url + "?w=600&h=400&fit=crop"}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover",
              opacity: i === currentIndex ? 1 : 0,
              transition: "opacity 1s ease-in-out"
            }}
          />
        )) : (
          <div style={{
            width: "100%", height: "100%", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 64, background: "linear-gradient(135deg, #e5e7eb, #d1d5db)"
          }}>
            {config.emoji}
          </div>
        )}
        {/* Country name overlay on image */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "40px 20px 16px",
          background: "linear-gradient(transparent, rgba(0,0,0,0.6))"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 32 }}>{config.emoji}</span>
            <h3 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
              {lang === "zh" ? config.zhName : countryKey}
            </h3>
          </div>
        </div>
        {/* Carousel dots */}
        {images && images.length > 1 && (
          <div style={{
            position: "absolute", top: 12, right: 12,
            display: "flex", gap: 4
          }}>
            {images.map((_, i) => (
              <div key={i} style={{
                width: 6, height: 6, borderRadius: "50%",
                background: i === currentIndex ? "#fff" : "rgba(255,255,255,0.4)",
                transition: "background 0.3s"
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Info area */}
      <div style={{ padding: "16px 20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <p style={{ margin: 0, fontSize: 14, color: "#6b7280", lineHeight: 1.5 }}>
            {config.description[lang]}
          </p>
          <span style={{ fontSize: 13, color: "#9ca3af", marginTop: 6, display: "inline-block" }}>
            {attractionCount} {lang === "zh" ? "個景點" : "attractions"}
          </span>
        </div>
        <div style={{
          marginTop: 16, padding: "10px 0", textAlign: "center",
          borderRadius: 10, background: "#059669", color: "#fff",
          fontWeight: 700, fontSize: 14
        }}>
          {lang === "zh" ? "探索景點 →" : "Explore →"}
        </div>
      </div>
    </div>
  );
}
