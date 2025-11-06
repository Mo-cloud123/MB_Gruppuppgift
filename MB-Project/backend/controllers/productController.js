// Fylls på i products-branchen.
// Lägger en enkel placeholder för att allt ska bygga.
export async function getHealth(req, res) {
  res.json({ ok: true, service: "backend", ts: new Date().toISOString() });
}
import { Product } from "../models/Product.js";

// SKAPA (POST)
export async function createProduct(req, res) {
  try {
    const { name, price } = req.body;
    const trimmedName = typeof name === "string" ? name.trim() : "";
    // Tillåt inkommande pris som sträng med kommatecken
    const numericPrice = Number(String(price).replace(",", "."));

    if (!trimmedName) {
      return res.status(400).json({ message: "Namn krävs" });
    }
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ message: "Ogiltigt pris" });
    }

    const product = await Product.create({ name: trimmedName, price: numericPrice });
    res.status(201).json(product);
  } catch (err) {
    console.error("Fel vid skapande:", err.message);
    res.status(500).json({ message: "Kunde inte skapa produkt" });
  }
}

// HÄMTA ALLA (GET)
export async function getProducts(_req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Fel vid hämtning av produkter" });
  }
}

// HÄMTA EN (GET/:id)
export async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produkt ej hittad" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Ogiltigt ID" });
  }
}

// UPPDATERA (PUT/:id)
export async function updateProduct(req, res) {
  try {
    const { name, price } = req.body;
    const update = {};
    if (typeof name === "string") {
      const trimmedName = name.trim();
      if (!trimmedName) {
        return res.status(400).json({ message: "Namn får inte vara tomt" });
      }
      update.name = trimmedName;
    }
    if (price !== undefined) {
      const numericPrice = Number(String(price).replace(",", "."));
      if (Number.isNaN(numericPrice) || numericPrice < 0) {
        return res.status(400).json({ message: "Ogiltigt pris" });
      }
      update.price = numericPrice;
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: "Produkt ej hittad" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Fel vid uppdatering" });
  }
}

// RADERA (DELETE/:id)
export async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Produkt ej hittad" });
    res.json({ message: "Produkt raderad" });
  } catch (err) {
    res.status(400).json({ message: "Fel vid radering" });
  }
}
