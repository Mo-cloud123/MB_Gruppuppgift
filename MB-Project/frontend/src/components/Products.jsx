import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  // Hämta alla produkter
  async function fetchProducts() {
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Fel vid hämtning:", err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // Hantera formulärinmatning
  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Skapa produkt
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.price) return alert("Fyll i alla fält");
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
        }),
      });
      if (!res.ok) throw new Error("Kunde inte spara");
      setForm({ name: "", price: "" });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="card">
      <h1>Produkter</h1>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Namn
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Produktnamn"
            required
          />
        </label>
        <label>
          Pris
          <input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            placeholder="Pris i SEK"
            required
          />
        </label>
        <button className="btn">Lägg till produkt</button>
      </form>

      <hr style={{ margin: "1.5rem 0", border: "0.5px solid #1f2937" }} />

      <ul>
        {products.length === 0 && <p>Inga produkter ännu...</p>}
        {products.map((p) => (
          <li key={p._id} style={{ marginBottom: "0.5rem" }}>
            {p.name} – <strong>{p.price} kr</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

