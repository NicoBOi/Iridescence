const entries = [
  { label: "Email", value: "contact@iridescence.fr", href: "mailto:contact@iridescence.fr", external: false },
  { label: "Instagram", value: "@iridescence", href: "https://instagram.com/iridescence", external: true },
  { label: "Vimeo", value: "iridescence", href: "https://vimeo.com/iridescence", external: true },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-6 md:px-8 py-20 scroll-mt-20"
      style={{ borderTop: "1px solid var(--ink)" }}
    >
      <h2 className="uppercase mb-10" style={{ fontSize: "11px", letterSpacing: "0.2em", color: "var(--text-muted)" }}>
        Contact
      </h2>

      <p
        className="font-display uppercase mb-14"
        style={{
          fontWeight: 600,
          fontSize: "clamp(28px, 5vw, 64px)",
          lineHeight: 1.02,
          letterSpacing: "0.01em",
          maxWidth: "18ch",
        }}
      >
        Films, clips, documentaires, projets visuels.
      </p>

      <div style={{ borderTop: "1px solid var(--border)" }}>
        {entries.map(({ label, value, href, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group grid grid-cols-[100px_1fr] md:grid-cols-[180px_1fr] items-center gap-4 min-h-[56px] transition-colors duration-200 hover:bg-[var(--ink)] hover:text-[var(--bg)]"
            style={{ borderBottom: "1px solid var(--border)", paddingLeft: "8px", paddingRight: "8px", marginLeft: "-8px", marginRight: "-8px" }}
          >
            <span className="uppercase" style={{ fontSize: "11px", letterSpacing: "0.14em" }}>
              {label}
            </span>
            <span style={{ fontSize: "14px" }}>{value}</span>
          </a>
        ))}
        <div className="grid grid-cols-[100px_1fr] md:grid-cols-[180px_1fr] items-center gap-4 py-4">
          <span className="uppercase" style={{ fontSize: "11px", letterSpacing: "0.14em", color: "var(--text-muted)" }}>
            Atelier
          </span>
          <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Bordeaux, France</span>
        </div>
      </div>
    </section>
  );
}
