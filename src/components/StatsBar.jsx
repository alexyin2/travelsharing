import SectionIntro from "./SectionIntro";

export default function StatsBar({ attractionCount, regionCount, lang }) {
  const stats = [
    {
      value: attractionCount,
      label: lang === "zh" ? "精選景點" : "curated attractions",
    },
    {
      value: regionCount,
      label: lang === "zh" ? "區域章節" : "regional chapters",
    },
    {
      value: lang === "zh" ? "雙語" : "bilingual",
      label: lang === "zh" ? "規劃體驗" : "planning experience",
    },
  ];

  return (
    <section className="canvas-section">
      <div className="page-container">
        <SectionIntro
          eyebrow={lang === "zh" ? "System Snapshot" : "System Snapshot"}
          title={lang === "zh" ? "目前內容底盤已經足夠支撐一個更成熟的產品首頁" : "The current content foundation is already strong enough for a more mature product homepage"}
          description={
            lang === "zh"
              ? "設計升級後，這些數字不只是一排 stats，而是整個信任感與價值感的起點。"
              : "After the redesign, these numbers become part of the trust signal instead of feeling like generic metrics."
          }
        />

        <div className="stats-board">
          {stats.map((item) => (
            <div key={item.label} className="stats-board__item">
              <div className="stats-board__value">{item.value}</div>
              <div className="stats-board__label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
