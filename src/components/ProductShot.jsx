import { COUNTRY_CONFIG, COUNTRY_ORDER } from "../lib/constants";

export default function ProductShot({ lang }) {
  const countries = COUNTRY_ORDER.map((countryKey) => COUNTRY_CONFIG[countryKey]);
  const previewDays = [
    {
      day: "Day 1",
      titleZh: "抵達與港口暖身",
      titleEn: "Arrival and Harbor Warm-up",
      slots: [
        {
          time: "10:00 - 12:00",
          zh: "入住後舊城與港口慢走，先把節奏放慢。",
          en: "Ease in with an old-town and harbor walk after check-in.",
        },
        {
          time: "13:00 - 16:00",
          zh: "挑一個主景點 + 一段沿海步行，不把第一天塞滿。",
          en: "Pair one anchor stop with a scenic coastal walk instead of overpacking day one.",
        },
      ],
      mealZh: "午餐：海港海鮮小館",
      mealEn: "Lunch: harbor seafood bistro",
      stayZh: "住宿：海景旅館 / 方便隔天出發",
      stayEn: "Stay: seaside hotel for an easy day-two start",
    },
    {
      day: "Day 2",
      titleZh: "主景點與拍照時段",
      titleEn: "Anchor Stops and Photo Windows",
      slots: [
        {
          time: "09:30 - 12:00",
          zh: "安排最重要的觀景點，早一點避開人潮與逆光。",
          en: "Hit the main viewpoint early for calmer light and lighter crowds.",
        },
        {
          time: "14:00 - 17:30",
          zh: "接續兩個順路停點，中段插入正式午餐。",
          en: "Link two nearby stops and place a real lunch in the middle to keep the day balanced.",
        },
      ],
      mealZh: "晚餐：作者私藏餐廳推薦",
      mealEn: "Dinner: editor's favorite dinner pick",
      stayZh: "住宿：留在同一區，減少搬行李",
      stayEn: "Stay: remain in the same base to avoid re-packing",
    },
    {
      day: "Day 3",
      titleZh: "留白探索與回程銜接",
      titleEn: "Open Exploration and Return Rhythm",
      slots: [
        {
          time: "10:30 - 13:00",
          zh: "用半天補喜歡的點，或改成咖啡館 / 市區散策。",
          en: "Use a half-day for a revisit or switch to cafes and a lighter city rhythm.",
        },
        {
          time: "14:30 - 18:00",
          zh: "把回程、採買與 sunset stop 收成一個順暢段落。",
          en: "Blend the drive back, a quick supply stop, and a final sunset window.",
        },
      ],
      mealZh: "加值：甜點 / 咖啡名單",
      mealEn: "Extra: dessert and coffee shortlist",
      stayZh: "延伸：隔天機場 / 車站動線提醒",
      stayEn: "Extra: airport and station notes for the next day",
    },
  ];

  return (
    <div className="product-shot">
      <div className="product-shot__chrome">
        <span />
        <span />
        <span />
      </div>

      <div className="product-shot__canvas">
        <aside className="product-shot__sidebar">
          <p className="eyebrow">{lang === "zh" ? "產品畫面預覽" : "Live Product Preview"}</p>
          <h3>{lang === "zh" ? "目的地章節" : "Destination Chapters"}</h3>
          <div className="product-shot__destinations">
            {countries.map((country) => (
              <div key={country.enName} className="product-shot__destination">
                <img alt="" src={country.image} />
                <div>
                  <strong>{lang === "zh" ? country.zhName : country.enName}</strong>
                  <span>{country.marketingEn}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="product-shot__content">
          <div className="product-shot__panel">
            <div className="product-shot__panel-header">
              <div>
                <p className="eyebrow">{lang === "zh" ? "行程預覽" : "Itinerary Flow"}</p>
                <h4>{lang === "zh" ? "篩選偏好，找到最佳行程" : "Filter preferences, find the best itinerary"}</h4>
              </div>
              <span className="product-shot__badge">{lang === "zh" ? "精選路線" : "Curated"}</span>
            </div>

            <div className="product-shot__pills">
              <span className="product-shot__pill">{lang === "zh" ? "3 日節奏" : "3-day rhythm"}</span>
              <span className="product-shot__pill">{lang === "zh" ? "餐廳推薦" : "Dining picks"}</span>
              <span className="product-shot__pill">{lang === "zh" ? "住宿參考" : "Stay notes"}</span>
            </div>

            <div className="product-shot__days">
              <article className="product-shot__day product-shot__day--featured">
                <div className="product-shot__day-header">
                  <div>
                    <span className="product-shot__day-index">{previewDays[0].day}</span>
                    <strong>{lang === "zh" ? previewDays[0].titleZh : previewDays[0].titleEn}</strong>
                  </div>
                  <span className="product-shot__day-tag">{lang === "zh" ? "預覽" : "Preview"}</span>
                </div>

                <div className="product-shot__slots">
                  {previewDays[0].slots.map((slot) => (
                    <div key={`${previewDays[0].day}-${slot.time}`} className="product-shot__slot">
                      <span className="product-shot__slot-time">{slot.time}</span>
                      <p className="product-shot__slot-copy">{lang === "zh" ? slot.zh : slot.en}</p>
                    </div>
                  ))}
                </div>

                <div className="product-shot__notes">
                  <span>{lang === "zh" ? previewDays[0].mealZh : previewDays[0].mealEn}</span>
                  <span>{lang === "zh" ? previewDays[0].stayZh : previewDays[0].stayEn}</span>
                </div>
              </article>

              <div className="product-shot__compact-days">
                {previewDays.slice(1).map((day) => (
                  <article key={day.day} className="product-shot__day product-shot__day--compact">
                    <div className="product-shot__day-header">
                      <div>
                        <span className="product-shot__day-index">{day.day}</span>
                        <strong>{lang === "zh" ? day.titleZh : day.titleEn}</strong>
                      </div>
                      <span className="product-shot__day-tag">{lang === "zh" ? "精選" : "Curated"}</span>
                    </div>

                    <div className="product-shot__compact-slots">
                      {day.slots.map((slot) => (
                        <div key={`${day.day}-${slot.time}`} className="product-shot__compact-slot">
                          <span>{slot.time}</span>
                          <p>{lang === "zh" ? slot.zh : slot.en}</p>
                        </div>
                      ))}
                    </div>

                    <div className="product-shot__compact-meta">
                      <span>{lang === "zh" ? day.mealZh : day.mealEn}</span>
                      <span>{lang === "zh" ? day.stayZh : day.stayEn}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
