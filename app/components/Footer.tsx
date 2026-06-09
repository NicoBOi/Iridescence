export default function Footer() {
  return (
    <footer style={{
      position: "fixed",
      bottom: 0, left: 0, right: 0,
      zIndex: 40,
      display: "flex",
      justifyContent: "space-between",
      padding: "0 28px 18px",
      pointerEvents: "none",
    }}>
      <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 11, color: "rgba(255,255,255,0.22)", letterSpacing: "0.06em" }}>
        Bordeaux
      </span>
      <span style={{ fontFamily: "var(--serif)", fontSize: 11, color: "rgba(255,255,255,0.22)", letterSpacing: "0.14em" }}>
        {new Date().getFullYear()}
      </span>
    </footer>
  );
}
