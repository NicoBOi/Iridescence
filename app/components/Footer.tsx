export default function Footer() {
  return (
    <footer
      className="px-6 md:px-8 py-8 flex items-center justify-between uppercase"
      style={{ borderTop: "1px solid var(--ink)", fontSize: "10px", letterSpacing: "0.16em", color: "var(--text-muted)" }}
    >
      <span>Iridescence · Index</span>
      <span>Bordeaux · {new Date().getFullYear()}</span>
    </footer>
  );
}
