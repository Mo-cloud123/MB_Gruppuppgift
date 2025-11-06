import { useEffect, useState } from "react";
import Toast from "./Toast.jsx";
import ConfirmModal from "./ConfirmModal.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, productId: null });
  const [errors, setErrors] = useState({ name: "", price: "" });
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
    // Rensa felmeddelanden när användaren börjar skriva
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  // Skapa eller uppdatera produkt
  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({ name: "", price: "" });

    // Validering
    if (!form.name.trim()) {
      setErrors((prev) => ({ ...prev, name: "Namn krävs" }));
      return;
    }
    if (!form.price) {
      setErrors((prev) => ({ ...prev, price: "Pris krävs" }));
      return;
    }

    // Tillåt decimalkomma och validera pris
    const parsedPrice = Number(String(form.price).replace(",", "."));
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      setErrors((prev) => ({
        ...prev,
        price: "Ogiltigt pris. Använd t.ex. 99.90 eller 99,90 och ej negativa värden.",
      }));
      return;
    }

    try {
      if (editingId) {
        // Uppdatera produkt
        const res = await fetch(`${API_URL}/products/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            price: parsedPrice,
          }),
        });
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          const msg = errBody?.message || "Kunde inte uppdatera";
          throw new Error(msg);
        }
        setToast({ message: "Produkt uppdaterad!", type: "success" });
      } else {
        // Skapa produkt
        const res = await fetch(`${API_URL}/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            price: parsedPrice,
          }),
        });
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          const msg = errBody?.message || "Kunde inte spara";
          throw new Error(msg);
        }
        setToast({ message: "Produkt tillagd!", type: "success" });
      }
      setForm({ name: "", price: "" });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      setToast({ message: err.message || "Ett fel uppstod", type: "error" });
    }
  }

  // Redigera produkt
  function handleEdit(product) {
    setForm({ name: product.name, price: product.price });
    setEditingId(product._id);
  }

  // Avbryt redigering
  function handleCancelEdit() {
    setForm({ name: "", price: "" });
    setEditingId(null);
  }

  // Öppna delete-modal
  function handleDeleteClick(productId) {
    setDeleteModal({ isOpen: true, productId });
  }

  // Bekräfta borttagning
  async function handleDeleteConfirm() {
    const { productId } = deleteModal;
    if (!productId) {
      setToast({ message: "Ingen produkt vald", type: "error" });
      return;
    }
    
    setDeleteModal({ isOpen: false, productId: null });

    try {
      const res = await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        const msg = errBody?.message || "Kunde inte ta bort";
        throw new Error(msg);
      }
      
      setToast({ message: "Produkt borttagen!", type: "success" });
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
      setToast({ 
        message: err.message || "Ett fel uppstod när produkten skulle tas bort", 
        type: "error" 
      });
    }
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        message="Är du säker på att du vill ta bort denna produkt?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ isOpen: false, productId: null })}
      />
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
          {errors.name && (
            <span style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "0.25rem" }}>
              {errors.name}
            </span>
          )}
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
          {errors.price && (
            <span style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "0.25rem" }}>
              {errors.price}
            </span>
          )}
        </label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="btn" type="submit">
            {editingId ? "Uppdatera produkt" : "Lägg till produkt"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn"
              onClick={handleCancelEdit}
              style={{ background: "#6b7280" }}
            >
              Avbryt
            </button>
          )}
        </div>
      </form>

      <hr style={{ margin: "1.5rem 0", border: "0.5px solid #1f2937" }} />

      <div>
        {products.length === 0 && <p>Inga produkter ännu...</p>}
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem",
              marginBottom: "0.5rem",
              background: "#0b1220",
              border: "1px solid #243042",
              borderRadius: "8px",
            }}
          >
            <div>
              <strong>{p.name}</strong> – <strong>{p.price} kr</strong>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                className="btn"
                onClick={() => handleEdit(p)}
                style={{
                  background: "#22c55e",
                  padding: "0.5rem 1rem",
                  fontSize: "0.9rem",
                }}
              >
                Redigera
              </button>
              <button
                className="btn"
                onClick={() => handleDeleteClick(p._id)}
                style={{
                  background: "#ef4444",
                  padding: "0.5rem 1rem",
                  fontSize: "0.9rem",
                }}
              >
                Ta bort
              </button>
            </div>
          </div>
        ))}
      </div>
      </section>
    </>
  );
}

