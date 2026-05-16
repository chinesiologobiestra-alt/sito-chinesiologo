import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

function Prenotazione() {
  const [form, setForm] = useState({
    nome: "",
    telefono: "",
    servizio: "",
    data: "",
    ora: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
            className="w-full p-4 rounded-xl bg-black border border-yellow-700 text-white"
          />

          <input
            name="telefono"
            placeholder="Telefono"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-yellow-700 text-white"
          />

          <select
            name="servizio"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-yellow-700 text-white"
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
            className="w-full p-4 rounded-xl bg-black border border-yellow-700 text-white"
          />

          <input
            type="time"
            name="ora"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-yellow-700 text-white"
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

function AdminPanel() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setBookings(data || []);
  };

  const eliminaPrenotazione = async (id) => {

    await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    loadBookings();
  };

  return (
    <section className="py-24 px-6 bg-black">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-yellow-500 mb-10 text-center">
          Dashboard Prenotazioni
        </h2>

        <div className="overflow-auto border border-yellow-700 rounded-3xl">

          <table className="w-full text-left">

            <thead className="bg-zinc-900">

              <tr>
                <th className="p-4">Nome</th>
                <th className="p-4">Telefono</th>
                <th className="p-4">Servizio</th>
                <th className="p-4">Data</th>
                <th className="p-4">Ora</th>
                <th className="p-4">Azioni</th>
              </tr>

            </thead>

            <tbody>

              {bookings.map((booking) => (

                <tr
                  key={booking.id}
                  className="border-t border-yellow-700"
                >

                  <td className="p-4">
                    {booking.patient_name}
                  </td>

                  <td className="p-4">
                    {booking.patient_phone}
                  </td>

                  <td className="p-4">
                    {booking.service}
                  </td>

                  <td className="p-4">
                    {booking.booking_date}
                  </td>

                  <td className="p-4">
                    {booking.booking_time}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() => eliminaPrenotazione(booking.id)}
                      className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl"
                    >
                      Elimina
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </section>
  );
}

export default function App() {

  const services = [
    "Valutazione chinesiologica",
    "Rieducazione posturale",
    "Recupero infortuni e dolore",
    "Dimagrimento funzionale",
    "Allenamento personalizzato",
    "Benessere e prevenzione",
  ];

  const faq = [
    {
      q: "Cos’è la chinesiologia?",
      a: "La chinesiologia studia il movimento umano e il suo ruolo nel benessere generale della persona.",
    },
    {
      q: "Posso iniziare anche se sono sedentario?",
      a: "Sì. Ogni percorso viene personalizzato in base al tuo livello di partenza.",
    },
    {
      q: "Serve una preparazione fisica?",
      a: "No, il percorso viene adattato alla persona e ai suoi obiettivi.",
    },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-black text-white min-h-screen">

      <header className="sticky top-0 z-50 bg-black border-b border-yellow-700">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <div>

            <h1 className="text-yellow-500 text-2xl font-bold">
              FB
            </h1>

            <p className="text-sm text-gray-400">
              Fabio Biestra – Chinesiologo
            </p>

          </div>

          <nav className="hidden md:flex gap-6 text-sm text-gray-300">

            <button onClick={() => scrollTo("chi-sono")}>
              Chi sono
            </button>

            <button onClick={() => scrollTo("servizi")}>
              Servizi
            </button>

            <button onClick={() => scrollTo("metodo")}>
              Metodo
            </button>

            <button onClick={() => scrollTo("faq")}>
              FAQ
            </button>

            <button onClick={() => scrollTo("prenota")}>
              Prenota
            </button>

          </nav>

          <a
            href="https://wa.me/393425620513"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 text-black px-5 py-2 rounded-full font-semibold"
          >
            Prenota
          </a>

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

        <blockquote className="italic text-yellow-400 mt-8 text-2xl max-w-3xl mx-auto">
          “Il vero benessere nasce dall’equilibrio tra mente, corpo e movimento.”
        </blockquote>

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
            Mi occupo di postura e benessere generale,
            accompagnando persone sedentarie e chi desidera
            migliorare il proprio stato fisico attraverso il movimento.
          </p>

        </div>

        <div className="flex justify-center">

          <img
            src="/fabio-biestra.jpeg"
            alt="Fabio Biestra"
            className="rounded-[2rem] border border-yellow-600 w-[380px] object-cover shadow-2xl"
          />

        </div>

      </section>

      <section
        id="servizi"
        className="bg-zinc-950 py-20 px-6"
      >

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl text-yellow-500 font-bold text-center mb-12">
            Servizi
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {services.map((service) => (

              <div
                key={service}
                className="bg-zinc-900 rounded-3xl p-6 border border-yellow-700 hover:border-yellow-500 transition"
              >

                <h3 className="text-yellow-400 font-semibold text-xl">
                  {service}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>

      <section id="metodo" className="py-24 px-6 bg-black">

        <div className="max-w-7xl mx-auto text-center">

          <p className="uppercase tracking-[0.3em] text-yellow-500 mb-3">
            Il mio metodo
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prestazioni su misura,
            <span className="text-yellow-500">
              {" "}risultati concreti
            </span>
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-16">

            <div className="bg-zinc-950 border border-yellow-700 rounded-[2rem] p-8">

              <div className="text-5xl mb-6">🔍</div>

              <h3 className="text-2xl font-bold mb-4">
                Valutazione iniziale
              </h3>

              <p className="text-gray-400 leading-7">
                Analisi completa della persona e degli obiettivi.
              </p>

            </div>

            <div className="bg-zinc-950 border border-yellow-700 rounded-[2rem] p-8">

              <div className="text-5xl mb-6">🧍</div>

              <h3 className="text-2xl font-bold mb-4">
                Analisi postura e movimento
              </h3>

              <p className="text-gray-400 leading-7">
                Valutazione di postura, mobilità e schemi motori.
              </p>

            </div>

            <div className="bg-zinc-950 border border-yellow-700 rounded-[2rem] p-8">

              <div className="text-5xl mb-6">🎯</div>

              <h3 className="text-2xl font-bold mb-4">
                Percorso personalizzato
              </h3>

              <p className="text-gray-400 leading-7">
                Programma costruito su misura in base agli obiettivi.
              </p>

            </div>

            <div className="bg-zinc-950 border border-yellow-700 rounded-[2rem] p-8">

              <div className="text-5xl mb-6">📈</div>

              <h3 className="text-2xl font-bold mb-4">
                Benessere e continuità
              </h3>

              <p className="text-gray-400 leading-7">
                Monitoraggio costante dei progressi nel tempo.
              </p>

            </div>

          </div>

        </div>

      </section>

      <section
        id="faq"
        className="bg-zinc-950 py-20 px-6"
      >

        <div className="max-w-4xl mx-auto">

          <h2 className="text-4xl text-yellow-500 font-bold text-center mb-12">
            FAQ
          </h2>

          <div className="space-y-4">

            {faq.map((item) => (

              <div
                key={item.q}
                className="bg-zinc-900 rounded-2xl p-6 border border-yellow-700"
              >

                <h3 className="font-semibold text-yellow-400 mb-2">
                  {item.q}
                </h3>

                <p className="text-gray-300">
                  {item.a}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      <Prenotazione />

      <AdminPanel />

      <footer className="border-t border-yellow-700 py-8 text-center text-gray-400">

        <p>Fabio Biestra – Chinesiologo</p>

        <p>Provincia di Pisa</p>

        <p>info@fabiobiestrachinesiologo.it</p>

      </footer>

    </div>
  );
}