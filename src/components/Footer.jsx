export default function Footer({ lang }) {
  return (
    <div style={{
      padding: "24px", textAlign: "center",
      borderTop: "1px solid #e5e7eb", color: "#9ca3af", fontSize: 13
    }}>
      {lang === "zh"
        ? `© ${new Date().getFullYear()} AlexTravelSharing — 真實旅行故事，AI 智能規劃`
        : `© ${new Date().getFullYear()} AlexTravelSharing — Real travel stories, AI-powered planning`
      }
    </div>
  );
}
