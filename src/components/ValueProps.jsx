const PROPS = [
  {
    icon: "🗺️",
    zh: { title: "真實旅行故事", desc: "所有景點都來自作者的親身體驗，不是網路複製貼上的資訊" },
    en: { title: "Real Travel Stories", desc: "Every attraction comes from firsthand experience, not copy-pasted info" }
  },
  {
    icon: "💡",
    zh: { title: "在地人私藏秘境", desc: "每個景點都有 Insider Tip，告訴你旅遊書上不會寫的小撇步" },
    en: { title: "Local Insider Tips", desc: "Every spot includes insider tips you won't find in travel books" }
  },
  {
    icon: "🌐",
    zh: { title: "中英雙語指南", desc: "完整的中英文介紹，適合各種語言背景的旅行者" },
    en: { title: "Bilingual Guides", desc: "Full Chinese & English descriptions for travelers of all backgrounds" }
  }
];

export default function ValueProps({ lang }) {
  return (
    <div style={{ padding: "60px 0", background: "#ffffff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#111827", textAlign: "center", letterSpacing: "-0.02em" }}>
          {lang === "zh" ? "為什麼選擇 AlexTravelSharing" : "Why AlexTravelSharing"}
        </h2>
        <p style={{ margin: "8px 0 40px", fontSize: 15, color: "#6b7280", textAlign: "center" }}>
          {lang === "zh" ? "我們和其他旅遊網站不一樣" : "What makes us different"}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {PROPS.map((p, i) => (
            <div key={i} style={{ textAlign: "center", padding: "24px 16px" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{p.icon}</div>
              <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700, color: "#111827" }}>
                {p[lang].title}
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
                {p[lang].desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
