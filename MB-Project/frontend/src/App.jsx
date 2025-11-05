import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import About from "./components/About";
import Products from "./components/Products";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <footer className="footer">© {new Date().getFullYear()} MB-Project</footer>
    </div>
  );
}

