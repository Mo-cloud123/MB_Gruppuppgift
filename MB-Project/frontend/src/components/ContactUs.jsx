import { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    alert("I nästa branch skickar vi detta till backend 🤝");
  };

  return (
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
  );
}

