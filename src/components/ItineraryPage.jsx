import { useState } from "react";
import { TYPE_EMOJI_FALLBACK, getPaceLabel, getPurposeLabel, getTransportLabel } from "../lib/constants";
import PremiumLock from "./PremiumLock";

function toMinutes(time) {
  if (!time || !time.includes(":")) return null;
  const [hours, minutes] = time.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  return hours * 60 + minutes;
}

function toTimeLabel(totalMinutes) {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hours = String(Math.floor(normalized / 60)).padStart(2, "0");
  const minutes = String(normalized % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function getTimeRange(time, durationMinutes) {
  if (!time) return "—";
  if (!durationMinutes) return time;

  const start = toMinutes(time);
  if (start == null) return time;
  return `${time} - ${toTimeLabel(start + durationMinutes)}`;
}

function getDurationLabel(durationMinutes, lang) {
  if (!durationMinutes) return null;
  if (durationMinutes >= 60) {
    const hours = durationMinutes / 60;
    const rounded = Number.isInteger(hours) ? hours : hours.toFixed(1);
    return lang === "zh" ? `${rounded} 小時` : `${rounded} hr`;
  }
  return lang === "zh" ? `${durationMinutes} 分鐘` : `${durationMinutes} min`;
}

function ItineraryStop({ stop, lang }) {
  const attraction = stop.attraction;
  const name = attraction
    ? (lang === "zh" ? attraction.nameZh : attraction.nameEn)
    : (lang === "zh" ? stop.labelZh : stop.labelEn) || "—";
  const emoji = attraction ? (TYPE_EMOJI_FALLBACK[attraction.type] || "📍") : "📍";
  const note = lang === "zh" ? stop.noteZh : stop.noteEn;
  const region = attraction?.region ? (lang === "zh" ? attraction.region.nameZh : attraction.region.nameEn) : null;

  const photoTip = lang === "zh" ? stop.photoTipZh : stop.photoTipEn;
  const mealAdvice = lang === "zh" ? stop.mealAdviceZh : stop.mealAdviceEn;
  const hotelAdvice = lang === "zh" ? stop.hotelAdviceZh : stop.hotelAdviceEn;
  const personalAdvice = lang === "zh" ? stop.personalAdviceZh : stop.personalAdviceEn;
  const hasPremium = photoTip || mealAdvice || hotelAdvice || personalAdvice;
  const timeRange = getTimeRange(stop.time, stop.durationMinutes);
  const durationLabel = getDurationLabel(stop.durationMinutes, lang);

  return (
    <div className="itinerary-stop">
      <div className="itinerary-stop__rail">
        <span className="itinerary-stop__time">{timeRange}</span>
        <span className="itinerary-stop__eyebrow">{lang === "zh" ? "行程段落" : "Time Block"}</span>
      </div>

      <div className="itinerary-stop__body">
        <div className="itinerary-stop__title-row">
          <strong>
            {emoji} {name}
          </strong>
        </div>

        <div className="itinerary-stop__meta">
          {region ? <span className="itinerary-stop__meta-chip">{region}</span> : null}
          {durationLabel ? <span className="itinerary-stop__meta-chip">{durationLabel}</span> : null}
        </div>

        {note ? <p>{note}</p> : null}

        {hasPremium ? (
          <div className="itinerary-stop__premium">
            <PremiumLock label={lang === "zh" ? "📷 拍照秘訣" : "📷 Photo Tip"} content={photoTip} lang={lang} />
            <PremiumLock label={lang === "zh" ? "🍽️ 用餐建議" : "🍽️ Meal Advice"} content={mealAdvice} lang={lang} />
            <PremiumLock label={lang === "zh" ? "🏨 住宿建議" : "🏨 Hotel Advice"} content={hotelAdvice} lang={lang} />
            <PremiumLock label={lang === "zh" ? "💡 私人建議" : "💡 Personal Advice"} content={personalAdvice} lang={lang} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function ItineraryPage({ lang, itinerary }) {
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  if (!itinerary) return null;

  const title = lang === "zh" ? itinerary.titleZh : itinerary.titleEn;
  const description = lang === "zh" ? itinerary.descriptionZh : itinerary.descriptionEn;
  const totalDays = itinerary.days?.length || itinerary.durationDays || 0;
  const totalStops = itinerary.days?.reduce((sum, day) => sum + (day.stops?.length || 0), 0) || 0;

  return (
    <section className="page-container itinerary-layout">
      <div className="composer-panel">
        <p className="eyebrow">{lang === "zh" ? "Itinerary" : "Itinerary"}</p>
        <h1>{title}</h1>
        <p className="composer-panel__lead">{description}</p>

        <div className="itinerary-meta-tags">
          {itinerary.durationDays ? (
            <span className="itinerary-meta-tag">{itinerary.durationDays} {lang === "zh" ? "天" : "days"}</span>
          ) : null}
          {itinerary.purpose ? (
            <span className="itinerary-meta-tag">{getPurposeLabel(itinerary.purpose, lang)}</span>
          ) : null}
          {itinerary.transportMode ? (
            <span className="itinerary-meta-tag">{getTransportLabel(itinerary.transportMode, lang)}</span>
          ) : null}
          {itinerary.pace ? (
            <span className="itinerary-meta-tag">{getPaceLabel(itinerary.pace, lang)}</span>
          ) : null}
        </div>

        <div className="itinerary-overview">
          <div className="itinerary-overview__card">
            <span className="itinerary-overview__label">{lang === "zh" ? "免費內容" : "Free Content"}</span>
            <strong>{lang === "zh" ? "所有每日行程可見" : "All daily schedules visible"}</strong>
            <p>{lang === "zh" ? "每天的時間軸、景點名稱、基本說明與交通資訊。" : "Daily timeline, attraction names, basic notes, and transport info."}</p>
          </div>
          <div className="itinerary-overview__card">
            <span className="itinerary-overview__label">{lang === "zh" ? "行程規模" : "Route Scale"}</span>
            <strong>{totalDays} {lang === "zh" ? "天" : "days"} / {totalStops} {lang === "zh" ? "個行程段落" : "stops"}</strong>
            <p>{lang === "zh" ? "完整路線從第一天到最後一天都已展開。" : "The full route is expanded from day one to the last day."}</p>
          </div>
          <div className="itinerary-overview__card">
            <span className="itinerary-overview__label">{lang === "zh" ? "Premium 內容" : "Premium Content"}</span>
            <strong>{lang === "zh" ? "進階旅行建議" : "Expert travel advice"}</strong>
            <p>{lang === "zh" ? "餐廳、住宿、拍照秘訣與作者私房建議。" : "Dining, stays, photo tips, and personal editor guidance."}</p>
          </div>
        </div>

        <div className="itinerary-board">
          {itinerary.days?.map((day, index) => {
            const dayTitle = lang === "zh" ? day.titleZh : day.titleEn;
            const daySummary = lang === "zh" ? day.summaryZh : day.summaryEn;

            return (
              <article key={day.dayNumber || index} className="itinerary-day">
                <div className="itinerary-day__header">
                  <div className="itinerary-day__headline">
                    <span className="itinerary-day__index">D{day.dayNumber || index + 1}</span>
                    <div>
                      <h3>{dayTitle}</h3>
                      {daySummary ? <p>{daySummary}</p> : null}
                    </div>
                  </div>

                  <div className="itinerary-day__stats">
                    <span>{day.stops?.length || 0} {lang === "zh" ? "段行程" : "stops"}</span>
                  </div>
                </div>

                <div className="itinerary-day__items">
                  {day.stops?.map((stop, stopIndex) => (
                    <ItineraryStop
                      key={`${day.dayNumber}-${stopIndex}`}
                      stop={stop}
                      lang={lang}
                    />
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <aside className="composer-sidebar">
        <div className="download-card">
          <p className="eyebrow">{lang === "zh" ? "下載行程" : "Download"}</p>
          <h2>{lang === "zh" ? "取得完整行程檔案" : "Get the full itinerary file"}</h2>
          <p>
            {lang === "zh"
              ? "將行程存成 PDF，隨時離線查看。"
              : "Save the itinerary as a PDF for offline access anytime."}
          </p>
          <button
            className="cta-button"
            onClick={() => setShowEmailPopup(true)}
            type="button"
          >
            {lang === "zh" ? "免費下載 PDF" : "Download free PDF"}
          </button>
          <button
            className="secondary-button"
            onClick={() => window.alert(lang === "zh" ? "購買功能開發中" : "Purchase feature coming soon")}
            type="button"
          >
            {lang === "zh" ? "購買完整版 NT$299" : "Buy full version NT$299"}
          </button>
        </div>

        <div className="summary-card summary-card--soft">
          <p className="eyebrow">{lang === "zh" ? "路線總覽" : "Route Outline"}</p>
          <div className="itinerary-outline">
            {itinerary.days?.map((day, index) => (
              <div key={day.dayNumber || index} className="itinerary-outline__item">
                <span className="itinerary-outline__index">D{day.dayNumber || index + 1}</span>
                <div>
                  <strong>{lang === "zh" ? day.titleZh : day.titleEn}</strong>
                  <p>{day.stops?.length || 0} {lang === "zh" ? "段安排" : "stops"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="summary-card summary-card--soft">
          <p className="eyebrow">{lang === "zh" ? "行程資訊" : "Itinerary Info"}</p>
          <ul className="summary-list">
            <li>{itinerary.durationDays} {lang === "zh" ? "天行程" : "day itinerary"}</li>
            <li>
              {lang === "zh"
                ? "所有日程可見，進階建議（餐廳、住宿、拍照、私房）需解鎖。"
                : "All daily schedules are visible. Premium advice (dining, stays, photos, tips) requires unlock."}
            </li>
            <li>
              {lang === "zh"
                ? "所有路線皆基於作者親身經驗。"
                : "All routes are based on the author's firsthand experience."}
            </li>
          </ul>
        </div>
      </aside>

      {showEmailPopup ? (
        <div className="email-popup-overlay" onClick={() => setShowEmailPopup(false)}>
          <div className="email-popup" onClick={(e) => e.stopPropagation()}>
            <h3>{lang === "zh" ? "輸入你的 Email" : "Enter your email"}</h3>
            <p>
              {lang === "zh"
                ? "我們會將免費版 PDF 寄到你的信箱。"
                : "We will send the free PDF to your inbox."}
            </p>
            <input
              type="email"
              placeholder="email@example.com"
              className="email-popup__input"
            />
            <button
              className="cta-button"
              type="button"
              onClick={() => {
                setShowEmailPopup(false);
                window.alert(lang === "zh" ? "功能開發中" : "Coming soon");
              }}
            >
              {lang === "zh" ? "送出" : "Submit"}
            </button>
            <button
              className="secondary-button"
              type="button"
              onClick={() => setShowEmailPopup(false)}
            >
              {lang === "zh" ? "取消" : "Cancel"}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
