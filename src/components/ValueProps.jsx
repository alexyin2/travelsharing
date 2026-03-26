import SectionIntro from "./SectionIntro";

const PROPS = [
  {
    icon: "01",
    zh: {
      title: "真實走訪後才整理成路線",
      desc: "每一條路線都來自實際走過、開過、住過之後的整理，不是從網路清單和旅遊模板拼起來的。",
    },
    en: {
      title: "Built from actual trips, not desk research",
      desc: "These routes come from places that were actually driven, walked, stayed in, and adjusted on the road.",
    },
  },
  {
    icon: "02",
    zh: {
      title: "節奏是照真實旅行去排的",
      desc: "不是把景點硬塞滿，而是考慮開車距離、體力、光線和每天真正能承受的節奏。",
    },
    en: {
      title: "Paced the way real travel days unfold",
      desc: "The routes are shaped around driving time, daylight, energy, and what a day actually feels like on the ground.",
    },
  },
  {
    icon: "03",
    zh: {
      title: "幫你縮小真正要做的決定",
      desc: "重點不是給你更多清單，而是幫你先整理出哪些停點值得、哪裡適合住、哪些安排可以略過。",
    },
    en: {
      title: "Useful decisions are narrowed down for you",
      desc: "Instead of giving you more tabs to compare, the guide helps narrow where to stop, stay, and spend your time.",
    },
  },
];

export default function ValueProps({ lang }) {
  return (
    <section className="canvas-section">
      <div className="page-container">
        <SectionIntro
          eyebrow={lang === "zh" ? "Why This Helps" : "Why This Helps"}
          title={lang === "zh" ? "把實際走過的經驗，整理成比較值得參考的路線" : "Field-tested routes for travelers who want more than saved pins"}
          description={
            lang === "zh"
              ? "這裡想提供的不是抽象靈感，而是更接近真實旅行決策的參考方式。"
              : "The goal is not more inspiration for your bookmarks, but something closer to practical travel judgment."
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
