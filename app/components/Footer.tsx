export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--film)",
        padding: "32px clamp(24px, 5vw, 80px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: "13px",
          letterSpacing: "0.04em",
          color: "rgba(255,255,255,0.3)",
        }}
      >
        Iridescence
      </span>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontSize: "11px",
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.2)",
        }}
      >
        Bordeaux · {new Date().getFullYear()}
      </span>
    </footer>
  );
}
