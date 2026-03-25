export default function PremiumLock({ label, content, lang }) {
  if (!content) return null;

  return (
    <div className="premium-lock">
      <div className="premium-lock__label">{label}</div>
      <div className="premium-lock__content">
        <p className="premium-lock__text">{content}</p>
        <div className="premium-lock__overlay">
          <span className="premium-lock__icon">🔒</span>
          <span>{lang === "zh" ? "付費解鎖" : "Unlock to read"}</span>
        </div>
      </div>
    </div>
  );
}
