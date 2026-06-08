export default function Footer() {
  return (
    <footer
      className="px-8 py-10 flex items-center justify-between"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <span className="text-xs" style={{ color: "var(--text-secondary)", letterSpacing: "0.1em" }}>
        Iridescence &copy; {new Date().getFullYear()}
      </span>
      <span className="text-xs" style={{ color: "var(--text-muted)", letterSpacing: "0.08em" }}>
        Bordeaux
      </span>
    </footer>
  );
}
