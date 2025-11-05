export default function Home() {
  return (
    <section className="card">
      <h1>Välkommen</h1>
      <p>Fullstack-react + express. Responsiv, enkel och tydlig UI.</p>
      <ul>
        <li>React Router för navigation</li>
        <li>Grundläggande grafisk profil</li>
        <li>Förberedd för API-anrop ({import.meta.env.VITE_API_URL})</li>
      </ul>
    </section>
  );
}

