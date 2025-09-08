export default function SectionHeader({ title, eyebrow, action }) {
  return (
    <div className="mb-6 md:mb-8 flex items-end justify-between">
      <div>
        {eyebrow && <div className="text-xs uppercase tracking-wider text-brand-gold">{eyebrow}</div>}
        <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
        <div className="mt-2 h-1 w-24 bg-brand-gold rounded-full" />
      </div>
      {action}
    </div>
  );
}
