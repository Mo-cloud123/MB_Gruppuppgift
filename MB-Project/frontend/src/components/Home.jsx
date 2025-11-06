import { useEffect, useState } from "react";
import Toast from "./Toast.jsx";
import ConfirmModal from "./ConfirmModal.jsx";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);
  const [purchaseModal, setPurchaseModal] = useState({ isOpen: false, product: null });
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

  // Öppna köp-modal
  function handlePurchaseClick(product) {
    setPurchaseModal({ isOpen: true, product });
  }

  // Bekräfta köp
  async function handlePurchaseConfirm() {
    const { product } = purchaseModal;
    setPurchaseModal({ isOpen: false, product: null });
    setToast({ message: `Tack för ditt köp av ${product.name}!`, type: "success" });
    // Här kan du lägga till logik för att spara ordern i backend senare
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
        isOpen={purchaseModal.isOpen}
        message={`Vill du köpa "${purchaseModal.product?.name}" för ${purchaseModal.product?.price} kr?`}
        onConfirm={handlePurchaseConfirm}
        onCancel={() => setPurchaseModal({ isOpen: false, product: null })}
      />
      <section className="card">
        <h1>Välkommen</h1>
      
      <hr style={{ margin: "1.5rem 0", border: "0.5px solid #1f2937" }} />

      <h2 style={{ marginBottom: "1rem" }}>Våra produkter</h2>
      
      {products.length === 0 ? (
        <p>Inga produkter tillgängliga för tillfället...</p>
      ) : (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
          gap: "1rem",
          marginTop: "1rem"
        }}>
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                background: "#0b1220",
                border: "1px solid #243042",
                borderRadius: "12px",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem"
              }}
            >
              <h3 style={{ margin: 0, color: "var(--color-primary)" }}>
                {product.name}
              </h3>
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: "bold" }}>
                {product.price} kr
              </p>
              <button
                className="btn"
                onClick={() => handlePurchaseClick(product)}
                style={{ marginTop: "auto" }}
              >
                Köp nu
              </button>
            </div>
          ))}
        </div>
      )}
      </section>
    </>
  );
}

