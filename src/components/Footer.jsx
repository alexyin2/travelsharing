export default function Footer({ lang }) {
  return (
    <footer className="site-footer">
      <div className="page-container site-footer__inner">
        <p>
          {lang === "zh"
            ? `© ${new Date().getFullYear()} AlexTravelSharing`
            : `© ${new Date().getFullYear()} AlexTravelSharing`}
        </p>
        <p>
          {lang === "zh"
            ? "真實旅行故事，整理成可以出發的行程。"
            : "Real travel stories, shaped into itineraries you can leave with."}
        </p>
      </div>
    </footer>
  );
}
