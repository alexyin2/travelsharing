import { COUNTRY_CONFIG, COUNTRY_ORDER } from "../lib/constants";

export default function ProductShot({ lang }) {
  const countries = COUNTRY_ORDER.map((countryKey) => COUNTRY_CONFIG[countryKey]);

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

            <div className="product-shot__timeline">
              <div>
                <strong>Day 1</strong>
                <span>{lang === "zh" ? "到達與城市散步" : "Arrival and city walk"}</span>
              </div>
              <div>
                <strong>Day 2</strong>
                <span>{lang === "zh" ? "重點景點與用餐節奏" : "Anchor attractions and dining rhythm"}</span>
              </div>
              <div>
                <strong>Day 3</strong>
                <span>{lang === "zh" ? "深入探索與順路路線" : "Deep exploration and route flow"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
