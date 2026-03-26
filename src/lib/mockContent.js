const MOCK_REGIONS = [
  { _id: "region-lofoten", nameEn: "Lofoten Islands", nameZh: "羅弗敦群島", slug: "lofoten", country: "Norway" },
  { _id: "region-christchurch-akaroa", nameEn: "Christchurch / Akaroa", nameZh: "基督城 / 阿卡羅阿", slug: "christchurch-akaroa", country: "New Zealand" },
  { _id: "region-dunedin", nameEn: "Dunedin", nameZh: "但尼丁", slug: "dunedin", country: "New Zealand" },
  { _id: "region-oamaru-kaikoura", nameEn: "Oamaru / Kaikoura", nameZh: "奧馬魯 / 凱庫拉", slug: "oamaru-kaikoura", country: "New Zealand" },
  { _id: "region-queenstown", nameEn: "Queenstown / Arrowtown / Glenorchy", nameZh: "皇后鎮 / 箭鎮 / 格林諾奇", slug: "queenstown", country: "New Zealand" },
  { _id: "region-te-anau", nameEn: "Te Anau / Milford Sound", nameZh: "蒂阿瑙 / 米佛峽灣", slug: "te-anau", country: "New Zealand" },
  { _id: "region-tekapo", nameEn: "Lake Tekapo / Mount Cook", nameZh: "蒂卡波湖 / 庫克山", slug: "tekapo", country: "New Zealand" },
  { _id: "region-wanaka", nameEn: "Wanaka", nameZh: "瓦納卡", slug: "wanaka", country: "New Zealand" },
  { _id: "region-london", nameEn: "Central London", nameZh: "倫敦市中心", slug: "london", country: "United Kingdom" },
];

const buildMockAttractions = (country, count) =>
  Array.from({ length: count }, (_, index) => ({
    _id: `attraction-${country.toLowerCase().replace(/\s+/g, "-")}-${index + 1}`,
    nameEn: `${country} Spot ${index + 1}`,
    nameZh: `${country} 景點 ${index + 1}`,
    slug: `${country.toLowerCase().replace(/\s+/g, "-")}-spot-${index + 1}`,
    country,
  }));

export const MOCK_ATTRACTIONS = [
  ...buildMockAttractions("Norway", 1),
  ...buildMockAttractions("New Zealand", 30),
  ...buildMockAttractions("United Kingdom", 1),
];

export { MOCK_REGIONS };
