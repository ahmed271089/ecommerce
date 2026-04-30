export default function Footer() {
  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        backgroundColor: "#111",
        color: "white",
        padding: "30px 20px",
        flexWrap: "wrap",
        gap: "30px",
        marginTop: "auto",
      }}
    >
      <div>
        <h2 style={{ marginBottom: "10px" }}>Contact</h2>
        <p>Adresse: Soukra Ariana</p>
        <p>Tel: 123456789</p>
      </div>

      <div style={{ maxWidth: "400px" }}>
        <h3 style={{ marginBottom: "10px" }}>
          Conditions générales d'utilisation
        </h3>
        <p style={{ lineHeight: "1.6" }}>
          Conditions d'utilisation • Politique de confidentialité • Mentions
          légales • Politique de retour
        </p>
      </div>
    </footer>
  );
}
