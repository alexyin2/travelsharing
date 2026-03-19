import { useState, useEffect, useRef } from "react";

const ATTRACTIONS_DATA = [
  {
    id: "lof-001", name: { zh: "Haukland 海灘", en: "Haukland Beach" }, region: "lofoten", type: "nature",
    tags: ["beach", "photography", "hiking"], coordinates: { lat: 68.2467, lng: 13.5381 },
    desc: { zh: "Lonely Planet 歐洲最美沙灘，白沙搭配壯闊山景", en: "Europe's best beach by Lonely Planet. White sand against dramatic peaks." },
    duration: 60, difficulty: "easy", emoji: "🏖️",
    tip: { zh: "沿步道走到 Uttakleiv 海灘，翻過山脊的景觀非常壯觀", en: "Walk the coastal path to Uttakleiv Beach — the ridge views are spectacular" }
  },
  {
    id: "lof-002", name: { zh: "Å 鎮 (奧鎮)", en: "Å i Lofoten" }, region: "lofoten", type: "village",
    tags: ["fishing_village", "photography", "culture"], coordinates: { lat: 67.877, lng: 12.983 },
    desc: { zh: "E10 公路盡頭，羅弗敦最南端的傳統漁村", en: "End of the E10 road — Lofoten's southernmost traditional fishing village." },
    duration: 60, difficulty: "easy", emoji: "🏘️",
    tip: { zh: "冬天 16:00 天黑，沿途很多停車拍照好點", en: "Dark by 16:00 in winter — lots of great photo stops along the way" }
  },
  {
    id: "lof-003", name: { zh: "Eliassen Rorbuer 漁屋", en: "Eliassen Rorbuer" }, region: "lofoten", type: "accommodation",
    tags: ["iconic", "photography", "rorbuer"], coordinates: { lat: 68.03, lng: 13.135 },
    desc: { zh: "孤獨星球封面背景！Hamnøy 島上的經典紅色漁屋", en: "Lonely Planet cover location! Iconic red fishermen's cabins on Hamnøy island." },
    duration: 720, difficulty: "easy", emoji: "🛖",
    tip: { zh: "清晨到橋上拍漁屋倒影，藍調時刻最美", en: "Photograph from the bridge at dawn — the blue hour reflection is magical" }
  },
  {
    id: "lof-004", name: { zh: "Reine 雷訥", en: "Reine" }, region: "lofoten", type: "village",
    tags: ["fishing_village", "photography", "iconic"], coordinates: { lat: 68.0313, lng: 13.1532 },
    desc: { zh: "挪威最美漁村，四周被險峻山峰和蔚藍峽灣環繞", en: "Norway's most beautiful village, surrounded by dramatic peaks and blue fjords." },
    duration: 60, difficulty: "easy", emoji: "⛰️",
    tip: { zh: "天氣好時 Reinebringen 步道的山頂俯瞰是此生必看", en: "Reinebringen trail summit view is a once-in-a-lifetime sight" }
  },
  {
    id: "lof-005", name: { zh: "Anita's Sjømat 海鮮餐廳", en: "Anita's Sjømat" }, region: "lofoten", type: "restaurant",
    tags: ["seafood", "fish_burger", "must_eat"], coordinates: { lat: 68.064, lng: 13.224 },
    desc: { zh: "羅弗敦必吃！招牌魚漢堡 199 NOK", en: "Lofoten's must-eat! Signature fish burger 199 NOK." },
    duration: 45, difficulty: "easy", emoji: "🐟",
    tip: { zh: "冬季營業時間不固定，記得先確認！我們第一次就撲空了", en: "Winter hours vary — check first! We got caught by a closed day" }
  },
  {
    id: "lof-006", name: { zh: "Svolvær 市中心", en: "Svolvær Town" }, region: "lofoten", type: "town",
    tags: ["town_center", "shopping"], coordinates: { lat: 68.2343, lng: 14.5682 },
    desc: { zh: "羅弗敦最大城鎮，紀念品店和超市的補給站", en: "Lofoten's largest town — your supply stop for souvenirs and groceries." },
    duration: 120, difficulty: "easy", emoji: "🏙️",
    tip: { zh: "這裡是長途自駕前最後的大型補給點", en: "Last major supply point before heading south" }
  },
  {
    id: "lof-007", name: { zh: "Austnesfjorden 極光點", en: "Austnesfjorden Aurora Spot" }, region: "lofoten", type: "aurora_spot",
    tags: ["aurora", "photography", "night"], coordinates: { lat: 68.27, lng: 14.75 },
    desc: { zh: "Svolvær 附近最佳極光觀測點，峽灣倒影超夢幻", en: "Best aurora spot near Svolvær — fjord reflections make magical photos." },
    duration: 120, difficulty: "easy", emoji: "🌌",
    tip: { zh: "凌晨三點成功看到極光！記得帶腳架和保暖裝備", en: "We caught aurora at 3 AM! Bring tripod and warm gear" }
  },
  {
    id: "lof-008", name: { zh: "Kabelvåg 小鎮", en: "Kabelvåg Village" }, region: "lofoten", type: "village",
    tags: ["fishing_village", "viewpoint"], coordinates: { lat: 68.2117, lng: 14.4833 },
    desc: { zh: "歷史悠久的前羅弗敦首府，高處可俯瞰港灣", en: "Historic former capital of Lofoten — hilltop views over the harbor." },
    duration: 60, difficulty: "easy", emoji: "🏘️",
    tip: { zh: "走到高處看港灣全景，很棒的拍照點", en: "Walk uphill for panoramic harbor views" }
  },
  {
    id: "lof-009", name: { zh: "Tjeldbergtind 登山", en: "Tjeldbergtind Hike" }, region: "lofoten", type: "hiking",
    tags: ["hiking", "viewpoint", "easy_hike"], coordinates: { lat: 68.22, lng: 14.46 },
    desc: { zh: "來回僅 45 分鐘的輕鬆步道，360° 俯瞰羅弗敦", en: "Easy 45-min round trip with 360° views over Lofoten." },
    duration: 60, difficulty: "easy", emoji: "🥾",
    tip: { zh: "性價比最高的登山步道，不費力就能看絕佳風景", en: "Best effort-to-reward hike — minimal effort, maximum views" }
  },
  {
    id: "lof-010", name: { zh: "Henningsvær", en: "Henningsvær" }, region: "lofoten", type: "village",
    tags: ["fishing_village", "art_galleries", "football_pitch"], coordinates: { lat: 68.1542, lng: 14.2073 },
    desc: { zh: "「羅弗敦的威尼斯」，有知名的岩島足球場", en: "The 'Venice of Lofoten' with the famous rock-island football pitch." },
    duration: 90, difficulty: "easy", emoji: "🎨",
    tip: { zh: "隨意散步拍照就很滿足，每個角落都很上鏡", en: "Just wander and photograph — every corner is photogenic" }
  },
  {
    id: "lof-011", name: { zh: "Uttakleiv 海灘", en: "Uttakleiv Beach" }, region: "lofoten", type: "nature",
    tags: ["beach", "aurora", "photography"], coordinates: { lat: 68.25, lng: 13.51 },
    desc: { zh: "以獨特圓石灘和冬季極光聞名的攝影天堂", en: "Famous for unique rounded stones and winter aurora — photographer's paradise." },
    duration: 60, difficulty: "easy", emoji: "🪨",
    tip: { zh: "傍晚來等極光，圓石配綠光是經典構圖", en: "Come at dusk for aurora — stones with green lights make a classic composition" }
  },
  {
    id: "lof-012", name: { zh: "Flakstad 沙灘", en: "Flakstad Beach" }, region: "lofoten", type: "nature",
    tags: ["beach", "photography"], coordinates: { lat: 68.09, lng: 13.23 },
    desc: { zh: "黑金色沙子搭配壯闊山景的美麗沙灘", en: "Beautiful beach with dark golden sand and dramatic mountain views." },
    duration: 45, difficulty: "easy", emoji: "🏖️",
    tip: { zh: "跟 Ramberg 沙灘安排同一天，距離很近", en: "Combine with Ramberg Beach — they're very close" }
  },
  {
    id: "lof-013", name: { zh: "Ramberg 沙灘", en: "Ramberg Beach" }, region: "lofoten", type: "nature",
    tags: ["beach", "photography"], coordinates: { lat: 68.11, lng: 13.24 },
    desc: { zh: "寧靜的白色沙灘，從公路就能輕鬆到達", en: "Tranquil white sand beach, easily accessible from the road." },
    duration: 30, difficulty: "easy", emoji: "🏖️"
  },
  {
    id: "lof-014", name: { zh: "Fredvang 小鎮", en: "Fredvang Village" }, region: "lofoten", type: "village",
    tags: ["fishing_village", "bridges"], coordinates: { lat: 68.08, lng: 13.14 },
    desc: { zh: "兩座跨海大橋本身就是一道風景", en: "The two sea-crossing bridges are a sight in themselves." },
    duration: 45, difficulty: "easy", emoji: "🌉"
  },
  {
    id: "lof-015", name: { zh: "Nappskaret 觀景台", en: "Nappskaret Viewpoint" }, region: "lofoten", type: "viewpoint",
    tags: ["viewpoint", "photography"], coordinates: { lat: 68.14, lng: 13.47 },
    desc: { zh: "E10 公路旁最值得停車的觀景點之一", en: "One of the best photo stops on the E10 driving route." },
    duration: 20, difficulty: "easy", emoji: "📸"
  },
  {
    id: "tro-001", name: { zh: "Fjellheisen 纜車", en: "Fjellheisen Cable Car" }, region: "tromsø", type: "activity",
    tags: ["cable_car", "viewpoint", "aurora", "night_view"], coordinates: { lat: 69.6396, lng: 19.0847 },
    desc: { zh: "4 分鐘登上 421m，俯瞰特羅姆瑟全景和極光", en: "4-min ride to 421m — panoramic views of Tromsø and aurora watching." },
    duration: 90, difficulty: "easy", emoji: "🚡",
    tip: { zh: "傍晚上去看夜景再等極光，一次搞定兩個願望", en: "Go evening for night views + aurora — two wishes in one trip" }
  },
  {
    id: "tro-002", name: { zh: "北極大教堂", en: "Arctic Cathedral" }, region: "tromsø", type: "landmark",
    tags: ["architecture", "church", "iconic"], coordinates: { lat: 69.6493, lng: 19.0623 },
    desc: { zh: "三角形現代設計靈感來自北極冰山，巨大彩色玻璃窗是亮點", en: "Triangular modern design inspired by Arctic icebergs. Massive stained-glass window." },
    duration: 30, difficulty: "easy", emoji: "⛪",
    tip: { zh: "去纜車的路上會經過，順路參觀", en: "On the way to the cable car — stop by en route" }
  },
  {
    id: "tro-003", name: { zh: "賞鯨行程", en: "Whale Watching Tour" }, region: "tromsø", type: "activity",
    tags: ["wildlife", "whale", "must_do"], coordinates: { lat: 69.6489, lng: 18.9551 },
    desc: { zh: "冬季限定！7-8 小時行程，可看座頭鯨和虎鯨", en: "Winter exclusive! 7-8 hour tour to see humpback and orca whales." },
    duration: 480, difficulty: "easy", emoji: "🐋",
    tip: { zh: "透過 Get Your Guide 預訂可臨時取消，記得吃暈船藥", en: "Book via Get Your Guide for flexible cancellation. Take seasickness meds!" }
  },
  {
    id: "tro-004", name: { zh: "峽灣遊船", en: "Fjord Cruise" }, region: "tromsø", type: "activity",
    tags: ["fjord", "boat", "scenic"], coordinates: { lat: 69.6489, lng: 18.9551 },
    desc: { zh: "5.5 小時遊覽特羅姆瑟周邊峽灣，雪山瀑布美不勝收", en: "5.5-hour cruise through Tromsø's fjords. Snow mountains and waterfalls." },
    duration: 330, difficulty: "easy", emoji: "⛵",
    tip: { zh: "比賞鯨短，適合不想花一整天在船上的人", en: "Shorter than whale watching — good for half-day preference" }
  },
  {
    id: "tro-005", name: { zh: "Tromsø 市中心", en: "Tromsø City Center" }, region: "tromsø", type: "town",
    tags: ["town_center", "harbor", "shopping"], coordinates: { lat: 69.6489, lng: 18.9568 },
    desc: { zh: "北極圈內最大城市，港口景色優美", en: "Largest city within the Arctic Circle — beautiful harbor views." },
    duration: 120, difficulty: "easy", emoji: "🏙️",
    tip: { zh: "三天公車 PASS 是最省交通費的方式", en: "3-day bus pass is the most cost-effective transport" }
  },
  {
    id: "tro-006", name: { zh: "Raketten 鹿肉熱狗", en: "Raketten Bar & Pølse" }, region: "tromsø", type: "restaurant",
    tags: ["street_food", "reindeer", "must_eat"], coordinates: { lat: 69.65, lng: 18.956 },
    desc: { zh: "特羅姆瑟必吃鹿肉熱狗，北極特色街頭小吃", en: "Tromsø's must-try reindeer hot dogs — iconic Arctic street food." },
    duration: 15, difficulty: "easy", emoji: "🌭"
  },
  {
    id: "tro-007", name: { zh: "Ølhallen 酒吧", en: "Ølhallen Brewery Pub" }, region: "tromsø", type: "restaurant",
    tags: ["bar", "beer", "historic"], coordinates: { lat: 69.6515, lng: 18.958 },
    desc: { zh: "世界最北釀酒廠 Mack 旗下酒吧，1877 年創立", en: "World's northernmost brewery Mack's pub, est. 1877." },
    duration: 60, difficulty: "easy", emoji: "🍺",
    tip: { zh: "在世界最北酒吧喝一杯是很特別的體驗", en: "Drinking at the world's northernmost brewery pub is a unique experience" }
  },
  {
    id: "tro-008", name: { zh: "Bubba Foodbar 炸鱈魚", en: "Bubba Foodbar" }, region: "tromsø", type: "restaurant",
    tags: ["fish_and_chips", "restaurant"], coordinates: { lat: 69.6492, lng: 18.9555 },
    desc: { zh: "人氣炸鱈魚和薯條，份量實在", en: "Popular fried cod and chips — generous portions." },
    duration: 60, difficulty: "easy", emoji: "🍽️",
    tip: { zh: "份量很大，可以兩人分享", en: "Portions are large — share between two" }
  }
];

const TYPE_COLORS = {
  nature: { bg: "#0f4c3a", text: "#6ee7b7", label: "自然景觀" },
  village: { bg: "#4a2c17", text: "#fbbf24", label: "漁村小鎮" },
  accommodation: { bg: "#3b1f4a", text: "#c4b5fd", label: "特色住宿" },
  restaurant: { bg: "#4a1d1d", text: "#fca5a5", label: "美食餐廳" },
  activity: { bg: "#1e3a5f", text: "#7dd3fc", label: "體驗活動" },
  town: { bg: "#374151", text: "#d1d5db", label: "城鎮市區" },
  aurora_spot: { bg: "#1a1a3e", text: "#a78bfa", label: "極光觀測" },
  landmark: { bg: "#3d2e1f", text: "#fcd34d", label: "地標景點" },
  hiking: { bg: "#1a3a2a", text: "#86efac", label: "登山步道" },
  viewpoint: { bg: "#2d2d4e", text: "#93c5fd", label: "觀景台" }
};

const UNSPLASH_IMAGES = {
  "lof-001": "https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?w=600&h=400&fit=crop",
  "lof-002": "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop",
  "lof-003": "https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=600&h=400&fit=crop",
  "lof-004": "https://images.unsplash.com/photo-1601439678777-b2b3c56fa627?w=600&h=400&fit=crop",
  "lof-005": "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=600&h=400&fit=crop",
  "lof-006": "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600&h=400&fit=crop",
  "lof-007": "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=600&h=400&fit=crop",
  "lof-008": "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?w=600&h=400&fit=crop",
  "lof-009": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop",
  "lof-010": "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&h=400&fit=crop",
  "lof-011": "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop",
  "lof-012": "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=600&h=400&fit=crop",
  "lof-013": "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&h=400&fit=crop",
  "lof-014": "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=400&fit=crop",
  "lof-015": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
  "tro-001": "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop",
  "tro-002": "https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=600&h=400&fit=crop",
  "tro-003": "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=600&h=400&fit=crop",
  "tro-004": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
  "tro-005": "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?w=600&h=400&fit=crop",
  "tro-006": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=400&fit=crop",
  "tro-007": "https://images.unsplash.com/photo-1575037614876-c38a4c44f4c4?w=600&h=400&fit=crop",
  "tro-008": "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=600&h=400&fit=crop"
};

function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i, left: Math.random() * 100, top: Math.random() * 100,
    size: Math.random() * 2 + 0.5, delay: Math.random() * 5, dur: Math.random() * 3 + 2
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position: "absolute", left: `${s.left}%`, top: `${s.top}%`,
          width: s.size, height: s.size, borderRadius: "50%", background: "#fff",
          animation: `twinkle ${s.dur}s ${s.delay}s infinite ease-in-out`
        }} />
      ))}
    </div>
  );
}

function AttractionCard({ item, lang, selected, onToggle }) {
  const tc = TYPE_COLORS[item.type] || TYPE_COLORS.nature;
  const isSelected = selected.includes(item.id);
  return (
    <div onClick={() => onToggle(item.id)} style={{
      position: "relative", borderRadius: 16, overflow: "hidden", cursor: "pointer",
      border: isSelected ? "2px solid #6ee7b7" : "2px solid transparent",
      boxShadow: isSelected ? "0 0 24px rgba(110,231,183,0.3)" : "0 4px 20px rgba(0,0,0,0.3)",
      transition: "all 0.3s ease", transform: isSelected ? "scale(1.02)" : "scale(1)",
      background: "#111827"
    }}>
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        <img src={UNSPLASH_IMAGES[item.id]} alt={item.name[lang]}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: isSelected ? "brightness(0.7)" : "brightness(0.6)" }} />
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 8 }}>
          <span style={{
            background: tc.bg, color: tc.text, padding: "4px 10px", borderRadius: 20,
            fontSize: 11, fontWeight: 600, backdropFilter: "blur(8px)", border: `1px solid ${tc.text}33`
          }}>{tc.label}</span>
        </div>
        <div style={{ position: "absolute", top: 12, right: 12 }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            background: isSelected ? "#6ee7b7" : "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
            transition: "all 0.3s", color: isSelected ? "#064e3b" : "#fff", fontSize: 16, fontWeight: 700
          }}>{isSelected ? "✓" : "+"}</div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px 16px 12px",
          background: "linear-gradient(transparent, rgba(0,0,0,0.85))" }}>
          <div style={{ fontSize: 22, marginBottom: 2 }}>{item.emoji}</div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#f9fafb", letterSpacing: "-0.02em" }}>
            {item.name[lang]}
          </h3>
        </div>
      </div>
      <div style={{ padding: "12px 16px 16px" }}>
        <p style={{ margin: 0, fontSize: 13, color: "#9ca3af", lineHeight: 1.5 }}>{item.desc[lang]}</p>
        <div style={{ display: "flex", gap: 12, marginTop: 10, fontSize: 11, color: "#6b7280" }}>
          <span>⏱ {item.duration >= 60 ? `${Math.round(item.duration / 60)}h` : `${item.duration}min`}</span>
          <span>📍 {item.region === "lofoten" ? (lang === "zh" ? "羅弗敦" : "Lofoten") : (lang === "zh" ? "特羅姆瑟" : "Tromsø")}</span>
        </div>
        {item.tip && (
          <div style={{ marginTop: 10, padding: "8px 10px", borderRadius: 8, background: "#1f2937", fontSize: 12, color: "#d1d5db", lineHeight: 1.4 }}>
            💡 {item.tip[lang]}
          </div>
        )}
      </div>
    </div>
  );
}

function TripForm({ lang, config, setConfig }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <label style={{ display: "block", fontSize: 13, color: "#9ca3af", marginBottom: 6, fontWeight: 500 }}>
          {lang === "zh" ? "旅行天數" : "Trip Duration"}
        </label>
        <div style={{ display: "flex", gap: 8 }}>
          {[3, 4, 5, 6, 7].map(d => (
            <button key={d} onClick={() => setConfig({ ...config, days: d })} style={{
              flex: 1, padding: "12px 0", borderRadius: 10, border: "none", cursor: "pointer",
              background: config.days === d ? "#6ee7b7" : "#1f2937",
              color: config.days === d ? "#064e3b" : "#9ca3af",
              fontWeight: 700, fontSize: 15, transition: "all 0.2s"
            }}>{d} {lang === "zh" ? "天" : "days"}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={{ display: "block", fontSize: 13, color: "#9ca3af", marginBottom: 6, fontWeight: 500 }}>
            {lang === "zh" ? "抵達時間" : "Arrival Time"}
          </label>
          <select value={config.arrival} onChange={e => setConfig({ ...config, arrival: e.target.value })}
            style={{ width: "100%", padding: "12px", borderRadius: 10, border: "1px solid #374151",
              background: "#1f2937", color: "#f9fafb", fontSize: 14, appearance: "none" }}>
            <option value="morning">{lang === "zh" ? "上午 (06-12)" : "Morning (06-12)"}</option>
            <option value="afternoon">{lang === "zh" ? "下午 (12-18)" : "Afternoon (12-18)"}</option>
            <option value="evening">{lang === "zh" ? "晚上 (18-24)" : "Evening (18-24)"}</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, color: "#9ca3af", marginBottom: 6, fontWeight: 500 }}>
            {lang === "zh" ? "離開時間" : "Departure Time"}
          </label>
          <select value={config.departure} onChange={e => setConfig({ ...config, departure: e.target.value })}
            style={{ width: "100%", padding: "12px", borderRadius: 10, border: "1px solid #374151",
              background: "#1f2937", color: "#f9fafb", fontSize: 14, appearance: "none" }}>
            <option value="morning">{lang === "zh" ? "上午 (06-12)" : "Morning (06-12)"}</option>
            <option value="afternoon">{lang === "zh" ? "下午 (12-18)" : "Afternoon (12-18)"}</option>
            <option value="evening">{lang === "zh" ? "晚上 (18-24)" : "Evening (18-24)"}</option>
          </select>
        </div>
      </div>
      <div>
        <label style={{ display: "block", fontSize: 13, color: "#9ca3af", marginBottom: 6, fontWeight: 500 }}>
          {lang === "zh" ? "交通方式" : "Transportation"}
        </label>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { val: "car", zh: "🚗 租車自駕", en: "🚗 Rent a Car" },
            { val: "bus", zh: "🚌 大眾運輸", en: "🚌 Public Transit" },
            { val: "mixed", zh: "🔀 混合", en: "🔀 Mixed" }
          ].map(t => (
            <button key={t.val} onClick={() => setConfig({ ...config, transport: t.val })} style={{
              flex: 1, padding: "12px 8px", borderRadius: 10, border: "none", cursor: "pointer",
              background: config.transport === t.val ? "#6ee7b7" : "#1f2937",
              color: config.transport === t.val ? "#064e3b" : "#9ca3af",
              fontWeight: 600, fontSize: 13, transition: "all 0.2s"
            }}>{t[lang]}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ItineraryPreview({ lang, itinerary, locked }) {
  if (!itinerary) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {itinerary.map((day, i) => (
        <div key={i} style={{
          background: "#111827", borderRadius: 16, padding: 20, border: "1px solid #1f2937",
          position: "relative", overflow: "hidden"
        }}>
          {locked && i > 0 && (
            <div style={{
              position: "absolute", inset: 0, background: "rgba(17,24,39,0.85)",
              backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 2, flexDirection: "column", gap: 8
            }}>
              <span style={{ fontSize: 32 }}>🔒</span>
              <span style={{ color: "#9ca3af", fontSize: 13 }}>
                {lang === "zh" ? "付費解鎖完整行程" : "Unlock full itinerary"}
              </span>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg, #6ee7b7, #3b82f6)", color: "#fff", fontWeight: 800, fontSize: 15
            }}>D{i + 1}</div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#f9fafb" }}>{day.title}</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {day.items.map((item, j) => (
              <div key={j} style={{
                display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 12px",
                borderRadius: 10, background: "#1f2937"
              }}>
                <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, minWidth: 50, paddingTop: 2 }}>{item.time}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#f9fafb" }}>{item.emoji} {item.name}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("zh");
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState([]);
  const [regionFilter, setRegionFilter] = useState("all");
  const [config, setConfig] = useState({ days: 5, arrival: "morning", departure: "morning", transport: "mixed" });
  const [generating, setGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const contentRef = useRef(null);

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filtered = ATTRACTIONS_DATA.filter(a => regionFilter === "all" || a.region === regionFilter);

  const generateItinerary = () => {
    setGenerating(true);
    const selectedAttractions = ATTRACTIONS_DATA.filter(a => selected.includes(a.id));
    setTimeout(() => {
      const days = [];
      const perDay = Math.ceil(selectedAttractions.length / config.days);
      for (let d = 0; d < config.days; d++) {
        const dayAttractions = selectedAttractions.slice(d * perDay, (d + 1) * perDay);
        const timeSlots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
        days.push({
          title: lang === "zh"
            ? `第 ${d + 1} 天 — ${dayAttractions[0]?.name[lang] || "自由活動"}`
            : `Day ${d + 1} — ${dayAttractions[0]?.name[lang] || "Free Time"}`,
          items: dayAttractions.map((a, i) => ({
            time: timeSlots[i] || "TBD", emoji: a.emoji, name: a.name[lang],
            note: a.desc[lang]
          }))
        });
      }
      setItinerary(days);
      setGenerating(false);
      setStep(3);
    }, 2000);
  };

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const titles = {
    0: { zh: "探索挪威極光之旅", en: "Discover Norway's Northern Lights" },
    1: { zh: "選擇你的夢想景點", en: "Choose Your Dream Destinations" },
    2: { zh: "設定旅行條件", en: "Set Your Trip Details" },
    3: { zh: "你的專屬行程", en: "Your Custom Itinerary" }
  };

  const subtitles = {
    0: { zh: "AI 為你量身打造完美的特羅姆瑟 & 羅弗敦旅程", en: "AI-crafted perfect Tromsø & Lofoten journey, just for you" },
    1: { zh: `已選擇 ${selected.length} 個景點`, en: `${selected.length} destinations selected` },
    2: { zh: "告訴我們你的旅行偏好", en: "Tell us your travel preferences" },
    3: { zh: "根據你的選擇，AI 已生成最佳行程", en: "Based on your picks, AI generated the optimal route" }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#030712", color: "#f9fafb", fontFamily: "'Outfit', 'Noto Sans TC', sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Noto+Sans+TC:wght@300;400;500;700&display=swap');
        @keyframes twinkle { 0%,100% { opacity: 0.2; } 50% { opacity: 1; } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 20px rgba(110,231,183,0.3); } 50% { box-shadow: 0 0 40px rgba(110,231,183,0.6); } }
        * { box-sizing: border-box; scrollbar-width: thin; scrollbar-color: #374151 transparent; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #374151; border-radius: 3px; }
        select option { background: #1f2937; color: #f9fafb; }
      `}</style>
      <Stars />

      {/* Header */}
      <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1f293766", position: "relative", zIndex: 10, backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }}>🌌</span>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em", background: "linear-gradient(135deg, #6ee7b7, #7dd3fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            AuroraTrip
          </span>
        </div>
        <button onClick={() => setLang(l => l === "zh" ? "en" : "zh")} style={{
          padding: "6px 14px", borderRadius: 20, border: "1px solid #374151", background: "#111827",
          color: "#9ca3af", cursor: "pointer", fontSize: 12, fontWeight: 600
        }}>{lang === "zh" ? "EN" : "中文"}</button>
      </div>

      {/* Progress */}
      <div style={{ padding: "12px 24px", display: "flex", gap: 6, position: "relative", zIndex: 10 }}>
        {[0, 1, 2, 3].map(s => (
          <div key={s} style={{
            flex: 1, height: 3, borderRadius: 2, transition: "all 0.5s",
            background: s <= step ? "linear-gradient(90deg, #6ee7b7, #3b82f6)" : "#1f2937"
          }} />
        ))}
      </div>

      {/* Title */}
      <div style={{ padding: "8px 24px 16px", position: "relative", zIndex: 10 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", animation: "slideUp 0.5s ease" }}>
          {titles[step][lang]}
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: 14, color: "#6b7280" }}>{subtitles[step][lang]}</p>
      </div>

      {/* Content */}
      <div ref={contentRef} style={{ flex: 1, overflow: "auto", padding: "0 24px 120px", position: "relative", zIndex: 10 }}>
        {step === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "slideUp 0.6s ease" }}>
            <div style={{ borderRadius: 20, overflow: "hidden", position: "relative", height: 280 }}>
              <img src="https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&h=400&fit=crop" alt="Aurora"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 40%, rgba(3,7,18,0.95))", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 24 }}>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Tromsø & Lofoten</h2>
                <p style={{ margin: "6px 0 0", fontSize: 14, color: "#9ca3af", lineHeight: 1.5 }}>
                  {lang === "zh"
                    ? "探索北極圈內的極光、峽灣、漁村與壯闘的自然景觀。由真實旅行經驗打造的在地攻略，搭配 AI 為你量身規劃最佳路線。"
                    : "Explore aurora, fjords, fishing villages and dramatic nature within the Arctic Circle. Real travel experience meets AI-powered route planning."}
                </p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[
                { emoji: "🌌", zh: "極光觀測", en: "Aurora Spots", num: "4+" },
                { emoji: "🏔️", zh: "精選景點", en: "Curated Spots", num: "23" },
                { emoji: "🤖", zh: "AI 行程", en: "AI Itinerary", num: "∞" }
              ].map((f, i) => (
                <div key={i} style={{ background: "#111827", borderRadius: 14, padding: "16px 12px", textAlign: "center", border: "1px solid #1f2937" }}>
                  <div style={{ fontSize: 28 }}>{f.emoji}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#6ee7b7", marginTop: 4 }}>{f.num}</div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{f[lang]}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div style={{ animation: "slideUp 0.5s ease" }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
              {[
                { val: "all", zh: "全部", en: "All" },
                { val: "lofoten", zh: "🏔️ 羅弗敦", en: "🏔️ Lofoten" },
                { val: "tromsø", zh: "🌌 特羅姆瑟", en: "🌌 Tromsø" }
              ].map(r => (
                <button key={r.val} onClick={() => setRegionFilter(r.val)} style={{
                  padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer",
                  background: regionFilter === r.val ? "#6ee7b7" : "#1f2937",
                  color: regionFilter === r.val ? "#064e3b" : "#9ca3af",
                  fontWeight: 600, fontSize: 13, transition: "all 0.2s"
                }}>{r[lang]}</button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {filtered.map(a => (
                <AttractionCard key={a.id} item={a} lang={lang} selected={selected} onToggle={toggleSelect} />
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ maxWidth: 500, animation: "slideUp 0.5s ease" }}>
            <TripForm lang={lang} config={config} setConfig={setConfig} />
            <div style={{ marginTop: 24, padding: 16, borderRadius: 14, background: "#111827", border: "1px solid #1f2937" }}>
              <h4 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 600, color: "#6ee7b7" }}>
                {lang === "zh" ? "📋 你選擇的景點" : "📋 Your Selected Spots"}
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {ATTRACTIONS_DATA.filter(a => selected.includes(a.id)).map(a => (
                  <span key={a.id} style={{ padding: "4px 10px", borderRadius: 20, background: "#1f2937", fontSize: 12, color: "#d1d5db" }}>
                    {a.emoji} {a.name[lang]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ maxWidth: 600, animation: "slideUp 0.5s ease" }}>
            <ItineraryPreview lang={lang} itinerary={itinerary} locked={true} />
            <div style={{ marginTop: 24, padding: 20, borderRadius: 16, background: "linear-gradient(135deg, #064e3b, #1e3a5f)", textAlign: "center" }}>
              <span style={{ fontSize: 32 }}>✨</span>
              <h3 style={{ margin: "8px 0 6px", fontSize: 18, fontWeight: 700 }}>
                {lang === "zh" ? "解鎖完整行程" : "Unlock Full Itinerary"}
              </h3>
              <p style={{ margin: 0, fontSize: 13, color: "#9ca3af" }}>
                {lang === "zh"
                  ? "包含每日詳細時間表、交通接駁指南、順路景點推薦、餐廳預訂建議"
                  : "Includes daily schedules, transport guides, route optimization, restaurant bookings"}
              </p>
              <button style={{
                marginTop: 16, padding: "12px 32px", borderRadius: 12, border: "none",
                background: "#6ee7b7", color: "#064e3b", fontWeight: 700, fontSize: 15, cursor: "pointer"
              }}>{lang === "zh" ? "NT$299 解鎖" : "$9.99 Unlock"}</button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 24px",
        background: "linear-gradient(transparent, #030712 30%)", zIndex: 20, paddingTop: 40
      }}>
        {step === 0 && (
          <button onClick={() => setStep(1)} style={{
            width: "100%", padding: "16px", borderRadius: 14, border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #6ee7b7, #3b82f6)", color: "#030712",
            fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em", animation: "glow 2s infinite"
          }}>{lang === "zh" ? "開始規劃我的極光之旅 →" : "Start Planning My Aurora Trip →"}</button>
        )}
        {step === 1 && (
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setStep(0)} style={{
              padding: "16px 20px", borderRadius: 14, border: "1px solid #374151",
              background: "#111827", color: "#9ca3af", cursor: "pointer", fontWeight: 600, fontSize: 14
            }}>←</button>
            <button onClick={() => setStep(2)} disabled={selected.length === 0} style={{
              flex: 1, padding: "16px", borderRadius: 14, border: "none", cursor: selected.length > 0 ? "pointer" : "not-allowed",
              background: selected.length > 0 ? "linear-gradient(135deg, #6ee7b7, #3b82f6)" : "#374151",
              color: selected.length > 0 ? "#030712" : "#6b7280",
              fontWeight: 800, fontSize: 16, transition: "all 0.3s"
            }}>{lang === "zh" ? `繼續 — 已選 ${selected.length} 個景點` : `Continue — ${selected.length} spots selected`}</button>
          </div>
        )}
        {step === 2 && (
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setStep(1)} style={{
              padding: "16px 20px", borderRadius: 14, border: "1px solid #374151",
              background: "#111827", color: "#9ca3af", cursor: "pointer", fontWeight: 600, fontSize: 14
            }}>←</button>
            <button onClick={generateItinerary} disabled={generating} style={{
              flex: 1, padding: "16px", borderRadius: 14, border: "none", cursor: "pointer",
              background: generating ? "#374151" : "linear-gradient(135deg, #6ee7b7, #3b82f6)",
              color: generating ? "#6b7280" : "#030712",
              fontWeight: 800, fontSize: 16, animation: generating ? "pulse 1.5s infinite" : "none"
            }}>{generating
              ? (lang === "zh" ? "🤖 AI 正在規劃中..." : "🤖 AI is planning...")
              : (lang === "zh" ? "🚀 生成我的專屬行程" : "🚀 Generate My Itinerary")}</button>
          </div>
        )}
        {step === 3 && (
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => { setStep(1); setItinerary(null); }} style={{
              padding: "16px 20px", borderRadius: 14, border: "1px solid #374151",
              background: "#111827", color: "#9ca3af", cursor: "pointer", fontWeight: 600, fontSize: 14
            }}>{lang === "zh" ? "重新選擇" : "Reselect"}</button>
            <button onClick={() => alert(lang === "zh" ? "付費功能開發中！" : "Payment coming soon!")} style={{
              flex: 1, padding: "16px", borderRadius: 14, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #6ee7b7, #3b82f6)", color: "#030712",
              fontWeight: 800, fontSize: 16
            }}>{lang === "zh" ? "💎 解鎖完整行程 NT$299" : "💎 Unlock Full Itinerary $9.99"}</button>
          </div>
        )}
      </div>
    </div>
  );
}
