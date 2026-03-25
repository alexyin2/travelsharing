export default function SectionIntro({ eyebrow, title, description }) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <p className="section-intro__line">
        <strong>{title}</strong>
        <span>{description}</span>
      </p>
    </div>
  );
}
