import SectionIntro from "./SectionIntro";

const PROPS = [
  {
    icon: "01",
    zh: {
      title: "真實經驗先於清單整理",
      desc: "每一條路線都從作者的實際旅程出發，不是從 SEO 關鍵字或旅遊書模板拼出來。",
    },
    en: {
      title: "Firsthand notes before generic listicles",
      desc: "Every route starts from real trips and field notes, not from SEO-driven boilerplate.",
    },
  },
  {
    icon: "02",
    zh: {
      title: "策展感與產品感並存",
      desc: "不是只有好看照片，而是能直接往下接景點選擇、行程條件與 itinerary preview。",
    },
    en: {
      title: "Editorial feel, product-grade flow",
      desc: "It is not just visual inspiration. You can move directly into spot selection and itinerary setup.",
    },
  },
  {
    icon: "03",
    zh: {
      title: "雙語內容一起成立",
      desc: "中英雙語不是附加功能，而是整個頁面與 CTA 都一起設計好的閱讀體驗。",
    },
    en: {
      title: "Bilingual by design",
      desc: "Chinese and English are treated as first-class reading experiences across the whole flow.",
    },
  },
];

export default function ValueProps({ lang }) {
  return (
    <section className="canvas-section">
      <div className="page-container">
        <SectionIntro
          eyebrow={lang === "zh" ? "Design Intent" : "Design Intent"}
          title={lang === "zh" ? "不是一般旅遊站，而是旅遊內容與規劃工具的交界" : "Not a generic travel site, but a meeting point between story and planning"}
          description={
            lang === "zh"
              ? "這次 redesign 的重點，是讓內容品牌與產品流程用同一套語言成立。"
              : "The redesign makes the editorial brand and the product flow feel like one coherent system."
          }
        />

        <div className="value-grid">
          {PROPS.map((item) => (
            <article key={item.icon} className="value-card">
              <span className="value-card__index">{item.icon}</span>
              <h3>{item[lang].title}</h3>
              <p>{item[lang].desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
