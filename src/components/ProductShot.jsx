import { useState } from "react";
import { COUNTRY_CONFIG, COUNTRY_ORDER } from "../lib/constants";

export default function ProductShot({ lang }) {
  const countries = COUNTRY_ORDER.map((countryKey) => ({
    key: countryKey,
    ...COUNTRY_CONFIG[countryKey],
  }));
  const [selectedCountry, setSelectedCountry] = useState("Norway");
  const previewPresets = {
    Norway: {
      eyebrowZh: "Lofoten 示意路線",
      eyebrowEn: "Lofoten Sample",
      titleZh: "羅弗敦 3 日節奏範本",
      titleEn: "3-Day Lofoten Rhythm",
      routeZh: "Hauklandstranda -> Å -> Reine -> Svolvær",
      routeEn: "Hauklandstranda -> Å -> Reine -> Svolvaer",
      days: [
        {
          day: "Day 1",
          titleZh: "抵達 Leknes，南下到 Å",
          titleEn: "Arrive in Leknes, then head south to Å",
          slots: [
            {
              time: "07:30 - 11:30",
              zh: "Leknes 取車後先去 Hauklandstranda Beach，沿途熟悉路況與停車節奏。",
              en: "Pick up the car in Leknes, then start with Hauklandstranda Beach to settle into the roads.",
            },
            {
              time: "13:00 - 16:00",
              zh: "經過超市採買後往南開，傍晚抵達 Å 鎮沿途停車拍照。",
              en: "Stock up at the supermarket, then drive south and stop along the way before reaching Å.",
            },
          ],
          mealZh: "餐廳：Anita's Sjomat 魚漢堡備選",
          mealEn: "Food: Anita's Sjomat as the fish-burger stop",
          stayZh: "住宿：Eliassen Rorbuer",
          stayEn: "Stay: Eliassen Rorbuer",
        },
        {
          day: "Day 2",
          titleZh: "Reine / Anita's / Svolvær",
          titleEn: "Reine / Anita's / Svolvaer",
          slots: [
            {
              time: "08:00 - 12:00",
              zh: "橋上拍 Eliassen Rorbuer，接著去 Reine 補經典角度。",
              en: "Start with the bridge view over Eliassen Rorbuer, then move on to classic Reine angles.",
            },
            {
              time: "13:30 - 18:00",
              zh: "中午吃 Anita's Sjomat，下午沿 E10 開到 Svolvær。",
              en: "Lunch at Anita's Sjomat, then drive the E10 all the way to Svolvaer.",
            },
          ],
          mealZh: "晚餐：Svolvær 市中心熟食 / 超市採買",
          mealEn: "Dinner: Svolvaer center takeaway or groceries",
          stayZh: "住宿：Repslagergata 11 Airbnb",
          stayEn: "Stay: Airbnb on Repslagergata 11",
        },
        {
          day: "Day 3",
          titleZh: "Kabelvåg / Tjeldbergtind / Henningsvær",
          titleEn: "Kabelvag / Tjeldbergtind / Henningsvaer",
          slots: [
            {
              time: "09:30 - 12:30",
              zh: "早上先去 Kabelvåg，再安排 Tjeldbergtind 輕量登山。",
              en: "Begin in Kabelvag, then fit in the short Tjeldbergtind hike.",
            },
            {
              time: "14:00 - 18:00",
              zh: "下午到 Henningsvær 和 Uttakleiv strand，收海灘與小鎮節奏。",
              en: "Spend the afternoon in Henningsvaer and Uttakleiv strand for village and beach rhythm.",
            },
          ],
          mealZh: "加值：Uttakleiv strand 黃昏停留",
          mealEn: "Extra: sunset stop at Uttakleiv strand",
          stayZh: "住宿：Sennesvik Airbnb",
          stayEn: "Stay: Airbnb in Sennesvik",
        },
      ],
    },
    "New Zealand": {
      eyebrowZh: "南島示意路線",
      eyebrowEn: "South Island Sample",
      titleZh: "紐西蘭南島 3 日示意版",
      titleEn: "3-Day South Island Sample",
      routeZh: "Christchurch -> Akaroa -> Tekapo -> Mount Cook",
      routeEn: "Christchurch -> Akaroa -> Tekapo -> Mount Cook",
      days: [
        {
          day: "Day 1",
          titleZh: "Christchurch 到 Akaroa",
          titleEn: "Christchurch to Akaroa",
          slots: [
            {
              time: "15:30 - 18:00",
              zh: "基督城落地後先到 Woolworths Hornby 採買，再往 Akaroa Harbour View / Hilltop 看風景。",
              en: "After landing in Christchurch, stop by Woolworths Hornby and continue to Akaroa Harbour View / Hilltop.",
            },
            {
              time: "18:30 - 20:30",
              zh: "進阿卡羅阿市區，走 Peninsula War Memorial 與海邊主街。",
              en: "Head into Akaroa town for the Peninsula War Memorial and a waterfront stroll.",
            },
          ],
          mealZh: "餐廳：Ma Maison / Akaroa Fish & Chips",
          mealEn: "Food: Ma Maison or Akaroa Fish & Chips",
          stayZh: "住宿：Akaroa Waterfront Motels",
          stayEn: "Stay: Akaroa Waterfront Motels",
        },
        {
          day: "Day 2",
          titleZh: "Akaroa 到 Lake Tekapo",
          titleEn: "Akaroa to Lake Tekapo",
          slots: [
            {
              time: "11:00 - 13:00",
              zh: "上午先去 Shamarra Alpacas，沿路在 Ashburton South 補給。",
              en: "Visit Shamarra Alpacas in the morning, then restock near Ashburton South.",
            },
            {
              time: "16:30 - 19:00",
              zh: "Fairlie Bakehouse 吃派後進 Tekapo，看好牧羊人教堂與湖邊步道。",
              en: "Stop for pies at Fairlie Bakehouse before arriving in Tekapo for the church and lake walk.",
            },
          ],
          mealZh: "餐廳：Fairlie Bakehouse / The Better Batter NZ",
          mealEn: "Food: Fairlie Bakehouse / The Better Batter NZ",
          stayZh: "住宿：Olive Sanctuary - Discover Tekapo",
          stayEn: "Stay: Olive Sanctuary - Discover Tekapo",
        },
        {
          day: "Day 3",
          titleZh: "Lake Tekapo 到 Mount Cook",
          titleEn: "Lake Tekapo to Mount Cook",
          slots: [
            {
              time: "09:00 - 12:00",
              zh: "Tekapo 飛行體驗或 Mt John Observatory，途中停 Lake Pukaki Viewing Spot。",
              en: "Start with Tekapo air experience or Mt John Observatory, then pause at Lake Pukaki Viewing Spot.",
            },
            {
              time: "13:00 - 17:30",
              zh: "中午吃 Mt Cook Alpine Salmon Shop，下午 Glacier Explorers 或 Hooker Valley Track。",
              en: "Lunch at Mt Cook Alpine Salmon Shop, then Glacier Explorers or Hooker Valley Track in the afternoon.",
            },
          ],
          mealZh: "餐廳：Mt Cook Alpine Salmon Shop",
          mealEn: "Food: Mt Cook Alpine Salmon Shop",
          stayZh: "住宿：回 Tekapo 續住",
          stayEn: "Stay: return to Tekapo for the night",
        },
      ],
    },
  };
  const activePreset = previewPresets[selectedCountry];

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
              <button
                key={country.key}
                className={`product-shot__destination ${selectedCountry === country.key ? "product-shot__destination--active" : ""}`}
                onClick={() => setSelectedCountry(country.key)}
                type="button"
              >
                <img alt="" src={country.image} />
                <div>
                  <strong>{lang === "zh" ? country.zhName : country.enName}</strong>
                  <span>{country.marketingEn}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className="product-shot__content">
          <div className="product-shot__panel">
            <div className="product-shot__panel-header">
              <div>
                <p className="eyebrow">{lang === "zh" ? activePreset.eyebrowZh : activePreset.eyebrowEn}</p>
                <h4>{lang === "zh" ? activePreset.titleZh : activePreset.titleEn}</h4>
              </div>
              <span className="product-shot__badge">{lang === "zh" ? "精選路線" : "Curated"}</span>
            </div>

            <p className="product-shot__route-note">{lang === "zh" ? activePreset.routeZh : activePreset.routeEn}</p>

            <div className="product-shot__pills">
              <span className="product-shot__pill">{lang === "zh" ? "3 日節奏" : "3-day rhythm"}</span>
              <span className="product-shot__pill">{lang === "zh" ? "餐廳推薦" : "Dining picks"}</span>
              <span className="product-shot__pill">{lang === "zh" ? "住宿參考" : "Stay notes"}</span>
            </div>

            <div className="product-shot__days">
              <article className="product-shot__day product-shot__day--featured">
                <div className="product-shot__day-header">
                  <div>
                    <span className="product-shot__day-index">{activePreset.days[0].day}</span>
                    <strong>{lang === "zh" ? activePreset.days[0].titleZh : activePreset.days[0].titleEn}</strong>
                  </div>
                  <span className="product-shot__day-tag">{lang === "zh" ? "預覽" : "Preview"}</span>
                </div>

                <div className="product-shot__slots">
                  {activePreset.days[0].slots.map((slot) => (
                    <div key={`${activePreset.days[0].day}-${slot.time}`} className="product-shot__slot">
                      <span className="product-shot__slot-time">{slot.time}</span>
                      <p className="product-shot__slot-copy">{lang === "zh" ? slot.zh : slot.en}</p>
                    </div>
                  ))}
                </div>

                <div className="product-shot__notes">
                  <span>{lang === "zh" ? activePreset.days[0].mealZh : activePreset.days[0].mealEn}</span>
                  <span>{lang === "zh" ? activePreset.days[0].stayZh : activePreset.days[0].stayEn}</span>
                </div>
              </article>

              <div className="product-shot__compact-days">
                {activePreset.days.slice(1).map((day) => (
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
