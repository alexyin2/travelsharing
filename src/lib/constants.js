import norwayImage from "../assets/destinations/norway-fjord.jpg";
import newZealandImage from "../assets/destinations/new-zealand-mountains.jpg";

export const TYPE_COLORS = {
  nature: { bg: "#12382f", text: "#b9f4d0" },
  village: { bg: "#4c2e1c", text: "#f4c98a" },
  accommodation: { bg: "#352346", text: "#dbccff" },
  restaurant: { bg: "#4d1f26", text: "#ffc0c8" },
  activity: { bg: "#1d3d59", text: "#b4e3ff" },
  town: { bg: "#334155", text: "#dbe5f1" },
  aurora_spot: { bg: "#20224f", text: "#d2c5ff" },
  landmark: { bg: "#584423", text: "#f8df9c" },
  hiking: { bg: "#183629", text: "#c9f2a7" },
  viewpoint: { bg: "#2b3356", text: "#c7d7ff" },
  museum: { bg: "#5a4531", text: "#f2d7b2" },
  market: { bg: "#5b3b20", text: "#ffd38c" },
  palace: { bg: "#453158", text: "#e4d5ff" },
  park: { bg: "#1b4235", text: "#c0f0d1" },
  gallery: { bg: "#3f3152", text: "#dfd0ff" },
  theatre: { bg: "#512530", text: "#ffc7d0" },
  shopping: { bg: "#5a391a", text: "#ffd58d" },
  neighborhood: { bg: "#3f4a59", text: "#d9e3ef" },
  day_trip: { bg: "#1f4565", text: "#bae2ff" },
  beach: { bg: "#21506d", text: "#bde6ff" },
  lake: { bg: "#24365e", text: "#cad6ff" },
  glacier: { bg: "#2f4870", text: "#d1e1ff" },
};

export const TYPE_LABELS = {
  nature: { zh: "自然景觀", en: "Nature" },
  village: { zh: "漁村小鎮", en: "Village" },
  accommodation: { zh: "特色住宿", en: "Stay" },
  restaurant: { zh: "美食餐廳", en: "Dining" },
  activity: { zh: "體驗活動", en: "Activity" },
  town: { zh: "城鎮市區", en: "Town" },
  aurora_spot: { zh: "極光觀測", en: "Aurora" },
  landmark: { zh: "地標景點", en: "Landmark" },
  hiking: { zh: "登山步道", en: "Hiking" },
  viewpoint: { zh: "觀景台", en: "Viewpoint" },
  museum: { zh: "博物館", en: "Museum" },
  market: { zh: "市集", en: "Market" },
  palace: { zh: "宮殿", en: "Palace" },
  park: { zh: "公園", en: "Park" },
  gallery: { zh: "藝廊", en: "Gallery" },
  theatre: { zh: "劇院", en: "Theatre" },
  shopping: { zh: "購物", en: "Shopping" },
  neighborhood: { zh: "街區", en: "Neighborhood" },
  day_trip: { zh: "一日遊", en: "Day Trip" },
  beach: { zh: "海灘", en: "Beach" },
  lake: { zh: "湖泊", en: "Lake" },
  glacier: { zh: "冰川", en: "Glacier" },
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

export const COUNTRY_ORDER = ["Norway", "New Zealand"];

export const COUNTRY_CONFIG = {
  Norway: {
    emoji: "🇳🇴",
    accent: "#1c6d57",
    accentSoft: "#d5ebe3",
    zhName: "挪威",
    enName: "Norway",
    marketingEn: "Arctic fjords and aurora routes",
    description: {
      zh: "極光、峽灣、漁村與北歐路線感最強的實戰旅行地圖。",
      en: "Aurora routes, fjords, and fishing villages shaped into a practical Nordic playbook.",
    },
    image: norwayImage,
  },
  "New Zealand": {
    emoji: "🇳🇿",
    accent: "#38616f",
    accentSoft: "#d8e6ea",
    zhName: "紐西蘭南島",
    enName: "New Zealand South Island",
    marketingEn: "Lakes, peaks, and slow scenic drives",
    description: {
      zh: "冰川、湖泊、步道與長距離自駕節奏，專為南島行程編排而設計。",
      en: "Glaciers, lakes, trails, and long scenic drives curated for South Island itineraries.",
    },
    image: newZealandImage,
  },
};

export const PURPOSE_OPTIONS = [
  { val: "leisure", zh: "休閒放鬆", en: "Leisure", icon: "🌿" },
  { val: "see_all", zh: "景點全攻略", en: "See All Attractions", icon: "📸" },
  { val: "adventure", zh: "冒險探索", en: "Adventure", icon: "🧗" },
];

export const TRANSPORT_OPTIONS = [
  { val: "car", zh: "租車自駕", en: "Rent a car", icon: "🚗" },
  { val: "bus", zh: "大眾運輸", en: "Public transit", icon: "🚌" },
  { val: "mixed", zh: "混合", en: "Mixed", icon: "🔀" },
];

export const PACE_OPTIONS = [
  { val: "relaxed", zh: "悠閒", en: "Relaxed", icon: "🐢" },
  { val: "moderate", zh: "適中", en: "Moderate", icon: "🚶" },
  { val: "intensive", zh: "緊湊", en: "Intensive", icon: "🏃" },
];

export const BUDGET_OPTIONS = [
  { val: "budget", zh: "平價", en: "Budget", icon: "💰" },
  { val: "mid_range", zh: "中等", en: "Mid-range", icon: "💳" },
  { val: "premium", zh: "高級", en: "Premium", icon: "💎" },
];

export const SEASON_OPTIONS = [
  { val: "spring", zh: "春季 (3-5月)", en: "Spring (Mar-May)", icon: "🌸" },
  { val: "summer", zh: "夏季 (6-8月)", en: "Summer (Jun-Aug)", icon: "☀️" },
  { val: "autumn", zh: "秋季 (9-11月)", en: "Autumn (Sep-Nov)", icon: "🍂" },
  { val: "winter", zh: "冬季 (12-2月)", en: "Winter (Dec-Feb)", icon: "❄️" },
];

export const ARRIVAL_DEPARTURE_OPTIONS = [
  { val: "morning", zh: "上午 (06-12)", en: "Morning (06-12)", icon: "🌅" },
  { val: "noon", zh: "中午 (12-15)", en: "Noon (12-15)", icon: "☀️" },
  { val: "night", zh: "晚上 (18-24)", en: "Night (18-24)", icon: "🌙" },
];

export const DURATION_OPTIONS = [
  { val: "short", zh: "3-4 天", en: "3-4 days", min: 3, max: 4 },
  { val: "medium", zh: "5-7 天", en: "5-7 days", min: 5, max: 7 },
  { val: "long", zh: "8+ 天", en: "8+ days", min: 8, max: 99 },
];

export function getCountryName(countryKey, lang) {
  const config = COUNTRY_CONFIG[countryKey];
  if (!config) return countryKey;
  return lang === "zh" ? config.zhName : config.enName;
}

export function getTypeLabel(type, lang) {
  const label = TYPE_LABELS[type];
  if (!label) return lang === "zh" ? "精選景點" : "Featured";
  return lang === "zh" ? label.zh : label.en;
}
