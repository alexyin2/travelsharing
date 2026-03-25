export const TYPE_COLORS = {
  nature: { bg: "#0f4c3a", text: "#6ee7b7", label: "自然景觀" },
  village: { bg: "#4a2c17", text: "#fbbf24", label: "漁村小鎮" },
  accommodation: { bg: "#3b1f4a", text: "#c4b5fd", label: "特色住宿" },
  restaurant: { bg: "#4a1d1d", text: "#fca5a5", label: "美食餐廳" },
  activity: { bg: "#1e3a5f", text: "#7dd3fc", label: "體驗活動" },
  town: { bg: "#374151", text: "#d1d5db", label: "城鎮市區" },
  aurora_spot: { bg: "#1a1a3e", text: "#a78bfa", label: "極光觀測" },
  landmark: { bg: "#3d2e1f", text: "#fcd34d", label: "地標景點" },
  hiking: { bg: "#1a3a2a", text: "#86efac", label: "登山步道" },
  viewpoint: { bg: "#2d2d4e", text: "#93c5fd", label: "觀景台" },
  museum: { bg: "#3d2e1f", text: "#fcd34d", label: "博物館" },
  market: { bg: "#4a2c17", text: "#fbbf24", label: "市集" },
  palace: { bg: "#3b1f4a", text: "#c4b5fd", label: "宮殿" },
  park: { bg: "#0f4c3a", text: "#6ee7b7", label: "公園" },
  gallery: { bg: "#3b1f4a", text: "#c4b5fd", label: "藝廊" },
  theatre: { bg: "#4a1d1d", text: "#fca5a5", label: "劇院" },
  shopping: { bg: "#4a2c17", text: "#fbbf24", label: "購物" },
  neighborhood: { bg: "#374151", text: "#d1d5db", label: "街區" },
  day_trip: { bg: "#1e3a5f", text: "#7dd3fc", label: "一日遊" },
  beach: { bg: "#1e3a5f", text: "#7dd3fc", label: "海灘" },
  lake: { bg: "#1a1a3e", text: "#a78bfa", label: "湖泊" },
  glacier: { bg: "#2d2d4e", text: "#93c5fd", label: "冰川" },
};

export const TYPE_EMOJI_FALLBACK = {
  nature: "🏔️",
  village: "🏘️",
  accommodation: "🛖",
  restaurant: "🍽️",
  activity: "🎿",
  town: "🏙️",
  aurora_spot: "🌌",
  landmark: "⛪",
  hiking: "🥾",
  viewpoint: "📸",
  museum: "🏛️",
  market: "🏪",
  palace: "👑",
  park: "🌳",
  gallery: "🎨",
  theatre: "🎭",
  lake: "🧊",
  glacier: "🧊",
  beach: "🏖️",
  shopping: "🛍️",
  neighborhood: "🏘️",
  day_trip: "🚐",
};

export const COUNTRY_CONFIG = {
  Norway: {
    emoji: "🇳🇴", color: "#059669", bg: "#064e3b", zhName: "挪威",
    description: { zh: "極光、峽灣、漁村與壯闘的北歐自然", en: "Aurora, fjords, fishing villages & Nordic nature" }
  },
  "United Kingdom": {
    emoji: "🇬🇧", color: "#d97706", bg: "#78350f", zhName: "英國",
    description: { zh: "皇宮、博物館、劇院與歷史街區", en: "Palaces, museums, theatres & historic neighborhoods" }
  },
  "NZ South Island": {
    emoji: "🇳🇿", color: "#059669", bg: "#14532d", zhName: "紐西蘭南島",
    description: { zh: "冰川、湖泊、步道與壯麗自然景觀", en: "Glaciers, lakes, trails & dramatic landscapes" }
  },
};
