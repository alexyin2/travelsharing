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

function ItineraryStop({ stop, lang, locked }) {
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
          {locked ? <span className="itinerary-stop__status">{lang === "zh" ? "鎖定" : "Locked"}</span> : null}
        </div>

        <div className="itinerary-stop__meta">
          {region ? <span className="itinerary-stop__meta-chip">{region}</span> : null}
          {durationLabel ? <span className="itinerary-stop__meta-chip">{durationLabel}</span> : null}
        </div>

        {locked ? (
          <p className="itinerary-stop__locked-note">
            {lang === "zh" ? "解鎖後查看完整說明" : "Unlock to see full details"}
          </p>
        ) : (
          <>
            {note ? <p>{note}</p> : null}
          </>
        )}

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
  if (!itinerary) return null;

  const title = lang === "zh" ? itinerary.titleZh : itinerary.titleEn;
  const description = lang === "zh" ? itinerary.descriptionZh : itinerary.descriptionEn;
  const totalDays = itinerary.days?.length || itinerary.durationDays || 0;
  const previewStops = itinerary.days?.[0]?.stops?.length || 0;

  return (
    <section className="page-container itinerary-layout">
      <div className="composer-panel">
        <p className="eyebrow">{lang === "zh" ? "Itinerary Preview" : "Itinerary Preview"}</p>
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
            <span className="itinerary-overview__label">{lang === "zh" ? "預覽開放" : "Preview Access"}</span>
            <strong>{lang === "zh" ? "Day 1 完整可見" : "Day 1 fully visible"}</strong>
            <p>{lang === "zh" ? "先看到時間段、用餐與住宿節奏。" : "See time blocks, dining ideas, and stay rhythm before unlock."}</p>
          </div>
          <div className="itinerary-overview__card">
            <span className="itinerary-overview__label">{lang === "zh" ? "目前行程" : "Current Route"}</span>
            <strong>{totalDays} {lang === "zh" ? "天 / 首日" : "days / first day"}</strong>
            <p>{lang === "zh" ? `目前可預覽 ${previewStops} 個行程段落。` : `${previewStops} itinerary blocks are visible in the preview.`}</p>
          </div>
          <div className="itinerary-overview__card">
            <span className="itinerary-overview__label">{lang === "zh" ? "解鎖後可得" : "After Unlock"}</span>
            <strong>{lang === "zh" ? "完整每日節奏" : "Full daily rhythm"}</strong>
            <p>{lang === "zh" ? "包含餐廳、住宿、拍照與作者建議。" : "Includes dining, stays, photo notes, and editor guidance."}</p>
          </div>
        </div>

        <div className="itinerary-board">
          {itinerary.days?.map((day, index) => {
            const locked = index > 0;
            const dayTitle = lang === "zh" ? day.titleZh : day.titleEn;
            const daySummary = lang === "zh" ? day.summaryZh : day.summaryEn;

            return (
              <article key={day.dayNumber || index} className="itinerary-day">
                {locked ? (
                  <div className="itinerary-day__lock">
                    <strong>{lang === "zh" ? "付費後解鎖完整日程" : "Unlock the full itinerary"}</strong>
                    <span>{lang === "zh" ? "目前僅顯示第一天作為預覽。" : "Only day one is revealed in preview mode."}</span>
                  </div>
                ) : null}

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
                    <span>{locked ? (lang === "zh" ? "需解鎖" : "Locked") : (lang === "zh" ? "預覽中" : "Preview")}</span>
                  </div>
                </div>

                {locked ? (
                  <div className="itinerary-day__teaser">
                    <span>{lang === "zh" ? "完整版本會展開每個時段安排、餐廳建議、住宿節點與作者提示。" : "The full version expands each time block with dining, stay notes, and personal guidance."}</span>
                  </div>
                ) : null}

                <div className="itinerary-day__items">
                  {day.stops?.map((stop, stopIndex) => (
                    <ItineraryStop
                      key={`${day.dayNumber}-${stopIndex}`}
                      stop={stop}
                      lang={lang}
                      locked={locked}
                    />
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <aside className="composer-sidebar">
        <div className="paywall-card">
          <p className="eyebrow">{lang === "zh" ? "解鎖完整內容" : "Unlock"}</p>
          <h2>{lang === "zh" ? "升級成完整路線包" : "Upgrade to the full route pack"}</h2>
          <p>
            {lang === "zh"
              ? "把每日路線、餐廳、住宿與作者建議整理成真正可出發的 itinerary。"
              : "Turn the preview into a travel-ready itinerary with full route, dining, stays, and editor notes."}
          </p>
          <div className="paywall-card__price">{lang === "zh" ? "NT$299" : "$9.99"}</div>
          <div className="paywall-card__bullets">
            <span>{lang === "zh" ? "完整每日時間表" : "Full day-by-day timing"}</span>
            <span>{lang === "zh" ? "餐廳與住宿參考" : "Dining and stay references"}</span>
            <span>{lang === "zh" ? "拍照與作者提示" : "Photo and editor notes"}</span>
            <span>{lang === "zh" ? "出發前節奏建議" : "Trip rhythm guidance"}</span>
          </div>
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
                ? "第一天完整預覽，其餘天數需解鎖。"
                : "Day one is fully visible; remaining days require unlock."}
            </li>
            <li>
              {lang === "zh"
                ? "所有路線皆基於作者親身經驗。"
                : "All routes are based on the author's firsthand experience."}
            </li>
          </ul>
        </div>
      </aside>
    </section>
  );
}
