import { TYPE_EMOJI_FALLBACK, getPaceLabel, getPurposeLabel, getTransportLabel } from "../lib/constants";
import PremiumLock from "./PremiumLock";

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

  return (
    <div className="itinerary-stop">
      <span className="itinerary-stop__time">{stop.time}</span>
      <div className="itinerary-stop__body">
        <strong>
          {emoji} {name}
          {region ? <span className="itinerary-stop__region"> · {region}</span> : null}
        </strong>
        {locked ? (
          <p className="itinerary-stop__locked-note">
            {lang === "zh" ? "解鎖後查看完整說明" : "Unlock to see full details"}
          </p>
        ) : (
          <>
            {note ? <p>{note}</p> : null}
            {stop.durationMinutes ? (
              <span className="itinerary-stop__duration">
                {stop.durationMinutes >= 60
                  ? `${Math.round(stop.durationMinutes / 60)}h`
                  : `${stop.durationMinutes}m`}
              </span>
            ) : null}
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
                  <span className="itinerary-day__index">D{day.dayNumber || index + 1}</span>
                  <div>
                    <h3>{dayTitle}</h3>
                    {daySummary ? <p>{daySummary}</p> : null}
                  </div>
                </div>

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
              ? "包含每日詳細時間表、拍照秘訣、餐廳建議、住宿推薦與私人旅遊建議。"
              : "Includes daily schedules, photo tips, dining suggestions, hotel recommendations, and personal travel advice."}
          </p>
          <div className="paywall-card__price">{lang === "zh" ? "NT$299" : "$9.99"}</div>
          <div className="paywall-card__bullets">
            <span>{lang === "zh" ? "完整每日行程" : "Full daily schedule"}</span>
            <span>{lang === "zh" ? "拍照秘訣" : "Photo spot tips"}</span>
            <span>{lang === "zh" ? "餐廳與住宿建議" : "Dining & hotel advice"}</span>
            <span>{lang === "zh" ? "私人旅遊建議" : "Personal travel advice"}</span>
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
