import { useState } from "react";
import Toast from "./Toast.jsx";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [toast, setToast] = useState(null);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setToast({ message: "Tack för ditt meddelande! Vi hör av oss så fort som möjligt.", type: "success" });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <section className="card">
        <h1>Kontakta oss</h1>
      <form className="form" onSubmit={onSubmit}>
        <label>
          Namn
          <input name="name" value={form.name} onChange={onChange} required />
        </label>
        <label>
          E-post
          <input type="email" name="email" value={form.email} onChange={onChange} required />
        </label>
        <label>
          Meddelande
          <textarea name="message" value={form.message} onChange={onChange} rows={5} />
        </label>
        <button type="submit" className="btn">Skicka</button>
      </form>
      </section>
    </>
  );
}

