// src/pages/Home.jsx

import { useState } from "react";
import { supabase } from "../lib/supabase";

function Prenotazione() {
  const [form, setForm] = useState({
    nome: "",
    telefono: "",
    servizio: "",
    data: "",
    ora: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const invia = async () => {

    const { error } = await supabase
      .from("bookings")
      .insert([
        {
          patient_name: form.nome,
          patient_phone: form.telefono,
          service: form.servizio,
          booking_date: form.data,
          booking_time: form.ora,
        },
      ]);

    if (error) {
      alert("Errore durante la prenotazione");
      console.log(error);
      return;
    }

    alert("Prenotazione inviata correttamente!");

    const msg = `Ciao Fabio, vorrei prenotare:%0A
Nome: ${form.nome}%0A
Telefono: ${form.telefono}%0A
Servizio: ${form.servizio}%0A
Data: ${form.data}%0A
Ora: ${form.ora}`;

    window.open(
      `https://wa.me/393425620513?text=${msg}`,
      "_blank"
    );
  };

  return (
    <section id="prenota" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-3xl mx-auto">

        <h2 className="text-4xl font-bold text-yellow-500 text-center mb-10">
          Prenota una consulenza
        </h2>

        <div className="space-y-4">

          <input
            name="nome"
            placeholder="Nome e cognome"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-yellow-700/20 text-white"
          />

          <input
            name="telefono"
            placeholder="Telefono"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-yellow-700/20 text-white"
          />

          <select
            name="servizio"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-yellow-700/20 text-white"
          >
            <option>Seleziona servizio</option>
            <option>Valutazione chinesiologica</option>
            <option>Rieducazione posturale</option>
            <option>Benessere generale</option>
          </select>

          <input
            type="date"
            name="data"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-yellow-700/20 text-white"
          />

          <input
            type="time"
            name="ora"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-yellow-700/20 text-white"
          />

          <button
            onClick={invia}
            className="w-full bg-yellow-500 text-black font-bold p-4 rounded-xl hover:bg-yellow-400 transition"
          >
            Invia richiesta su WhatsApp
          </button>

        </div>
      </div>
    </section>
  );
}

export default function Home() {

  return (
    <div className="bg-black text-white min-h-screen">

      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-yellow-700/20">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <a
  href="/"
  className="flex items-center gap-4"
>

  <img
    src="/logo.png"
    alt="Fabio Biestra Logo"
    className="w-16 h-16 object-contain"
  />

  <div>

    <h1 className="text-yellow-500 text-2xl font-bold">
      Fabio Biestra
    </h1>

    <p className="text-sm text-gray-400">
      Chinesiologo
    </p>

  </div>

</a>

          <div className="flex items-center gap-6">

  <a
    href="tel:+393425620513"
    className="text-sm text-gray-300 hover:text-yellow-400 transition hidden md:block"
  >
    +39 342 562 0513
  </a>

  <a
    href="mailto:info@fabiobiestrachinesiologo.it"
    className="text-sm text-gray-300 hover:text-yellow-400 transition hidden md:block"
  >
    Email
  </a>

  <a
    href="https://wa.me/393425620513"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-yellow-500 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-400 transition"
  >
    Prenota
  </a>

</div>

        </div>
      </header>

      <section className="text-center py-24 px-6">

        <p className="uppercase tracking-[0.3em] text-yellow-500 mb-4">
          Provincia di Pisa
        </p>

        <h1 className="text-5xl md:text-7xl font-bold">
          Fabio Biestra{" "}
          <span className="text-yellow-500">
            Chinesiologo
          </span>
        </h1>

        <p className="text-gray-300 max-w-3xl mx-auto mt-6 text-xl">
          Percorsi personalizzati orientati a postura,
          benessere e qualità del movimento.
        </p>

      </section>

      <section
        id="chi-sono"
        className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center"
      >

        <div>

          <h2 className="text-4xl font-bold text-yellow-500 mb-6">
            Chi sono
          </h2>

          <p className="text-gray-300 leading-8">
            Sono Fabio Biestra, laureato in
            Scienze delle Attività Motorie e Sportive.
            Mi occupo di postura e benessere generale.
          </p>

        </div>

        <div className="flex justify-center">

          <img
            src="/fabio-biestra.jpeg"
            alt="Fabio Biestra"
            className="rounded-[2rem] border border-yellow-600/30 w-[380px] object-cover shadow-2xl"
          />

        </div>

      </section>

      <Prenotazione />

      <footer className="border-t border-yellow-700/20 py-12 px-6 bg-black">

  <div className="max-w-7xl mx-auto text-center">

    <h3 className="text-3xl font-bold text-yellow-500 mb-4">
      Fabio Biestra
    </h3>

    <p className="text-gray-400 mb-8">
      Chinesiologo
    </p>

    <div className="space-y-3 text-gray-300">

      <p>
        📍 Provincia di Pisa
      </p>

      <p>
        📞{" "}
        <a
          href="tel:+393425620513"
          className="hover:text-yellow-400 transition"
        >
          +39 342 562 0513
        </a>
      </p>

      <p>
        ✉️{" "}
        <a
          href="mailto:info@fabiobiestrachinesiologo.it"
          className="hover:text-yellow-400 transition"
        >
          info@fabiobiestrachinesiologo.it
        </a>
      </p>

    </div>

    <div className="mt-10 text-sm text-gray-500">

      © {new Date().getFullYear()} Fabio Biestra.
      Tutti i diritti riservati.

    </div>

  </div>

</footer>

    </div>
  );
}