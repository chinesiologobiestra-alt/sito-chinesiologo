import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import jsPDF from "jspdf";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Prenotazione() {

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefono: "",
    servizio: "",
    data: "",
    ora: "",
  });

  const [availableTimes, setAvailableTimes] = useState([]);

 const generaPDF = () => {

  const doc = new jsPDF("p", "mm", "a4");

  // SFONDO
  doc.setFillColor(248, 246, 242);
  doc.rect(0, 0, 210, 297, "F");

  // HEADER
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, 210, 45, "F");

  // LINEA ORO
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1.5);
  doc.line(0, 45, 210, 45);

  // LOGO
  doc.setTextColor(212, 175, 55);
  doc.setFontSize(36);
  doc.text("FB", 20, 28);

  // NOME
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text("FABIO BIESTRA", 45, 22);

  doc.setTextColor(212, 175, 55);
  doc.setFontSize(14);
  doc.text("CHINESIOLOGO", 45, 32);

  // TITOLO
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(28);
  doc.text("CONFERMA", 45, 70);

  doc.setTextColor(212, 175, 55);
  doc.text("PRENOTAZIONE", 110, 70);

  // TESTO
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(12);

  doc.text(
    "Grazie per aver scelto di affidarti a me per il tuo benessere.",
    45,
    82
  );

  // LINEA
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.3);
  doc.line(20, 95, 190, 95);

  // DETTAGLI
  doc.setTextColor(212, 175, 55);
  doc.setFontSize(16);
  doc.text("DETTAGLI APPUNTAMENTO", 30, 110);

  // BOX DESTRO
  doc.setFillColor(245, 242, 236);
  doc.roundedRect(125, 110, 55, 70, 4, 4, "F");

  // DATI
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  doc.text("CLIENTE", 30, 130);

  doc.setFontSize(18);
  doc.text(form.nome || "-", 30, 140);

  doc.setFontSize(12);
  doc.text("SERVIZIO", 30, 158);

  doc.setFontSize(16);
  doc.text(form.servizio || "-", 30, 168);

  doc.setFontSize(12);
  doc.text("DATA", 30, 186);

  doc.setFontSize(16);
  doc.text(form.data || "-", 30, 196);

  doc.setFontSize(12);
  doc.text("ORARIO", 95, 186);

  doc.setFontSize(16);
  doc.text(form.ora || "-", 95, 196);

  doc.setFontSize(12);
  doc.text("LUOGO", 30, 214);

  doc.setFontSize(16);
  doc.text("Studio - Provincia di Pisa", 30, 224);

  doc.setFontSize(10);
  doc.text(
    "Via delle Colline, 123 - 56025 Pontedera (PI)",
    30,
    232
  );

  // IMPORTANTE
  doc.setTextColor(212, 175, 55);
  doc.setFontSize(14);
  doc.text("IMPORTANTE", 135, 128);

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);

  doc.text(
    [
      "Ti invito a presentarti",
      "qualche minuto prima",
      "dell'orario stabilito.",
      "",
      "In caso di necessita,",
      "contattami per modificare",
      "o riprogrammare",
      "il tuo appuntamento.",
    ],
    135,
    140
  );

  // FRASE
  doc.setFillColor(245, 242, 236);
  doc.roundedRect(20, 245, 170, 22, 3, 3, "F");

  doc.setTextColor(212, 175, 55);
  doc.setFontSize(34);
  doc.text('"', 28, 260);

  doc.setTextColor(50, 50, 50);
  doc.setFontSize(12);

  doc.text(
    "Il movimento e la chiave per sbloccare il tuo potenziale.",
    55,
    255
  );

  doc.text(
    "Insieme, lavoreremo per il tuo benessere e i tuoi obiettivi.",
    55,
    262
  );

  // FOOTER
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 280, 210, 17, "F");

  doc.setTextColor(212, 175, 55);
  doc.setFontSize(10);

  doc.text(
    "Fabio Biestra - Chinesiologo",
    20,
    290
  );

  doc.text(
    "www.fabiobiestra.it",
    145,
    290
  );

  doc.save("prenotazione-premium.pdf");
};

  const allTimes = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const handleChange = async (e) => {

    const updatedForm = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(updatedForm);

    if (e.target.name === "data") {

      const { data, error } = await supabase
        .from("bookings")
        .select("booking_time")
        .eq("booking_date", e.target.value);

      if (error) {
        console.log(error);
        return;
      }

      const bookedTimes = data.map(
        (item) => item.booking_time
      );

      const freeTimes = allTimes.filter(
        (time) => !bookedTimes.includes(time)
      );

      setAvailableTimes(freeTimes);
    }
  };

  const invia = async () => {

    const { data: existing } = await supabase
      .from("bookings")
      .select("*")
      .eq("booking_date", form.data)
      .eq("booking_time", form.ora);

    if (existing.length > 0) {
      alert("Questo orario non è disponibile");
      return;
    }

    const { error } = await supabase
      .from("bookings")
.insert([
  {
    patient_name: form.nome,
    patient_email: form.email,
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

try {

  const response = await fetch("/api/send-email", {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      nome: form.nome,
      email: form.email,
      data: form.data,
      ora: form.ora,
      servizio: form.servizio,
    }),

  });

  if (!response.ok) {

    throw new Error("Errore invio email");

  }

  alert("Prenotazione inviata correttamente!");

  generaPDF();

} catch (err) {

  console.log(err);

  alert("Errore invio email");

}

  };

  const inviaWhatsApp = () => {

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

  const inviaEmail = () => {

    const subject = encodeURIComponent(
      "Prenotazione consulenza"
    );

    const body = encodeURIComponent(
`Nome: ${form.nome}

Telefono: ${form.telefono}

Servizio: ${form.servizio}

Data: ${form.data}

Ora: ${form.ora}`
    );

    window.location.href =
      `mailto:chinesiolo.biestra@gmail.com?subject=${subject}&body=${body}`;
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
<input
  type="email"
  name="email"
  placeholder="Email"
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

          <select
            name="ora"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-yellow-700 text-white"
          >

            <option>
              Seleziona orario
            </option>

            {availableTimes.map((time) => (
              <option
                key={time}
                value={time}
              >
                {time}
              </option>
            ))}

          </select>

          <div className="grid md:grid-cols-2 gap-4">

            <button
              onClick={async () => {
                await invia();
                inviaWhatsApp();
              }}
              className="w-full bg-yellow-500 text-black font-bold p-4 rounded-xl hover:bg-yellow-400 transition"
            >
              Prenota via WhatsApp
            </button>

            <button
  onClick={async () => {
    await invia();
  }}
              className="w-full bg-white text-black font-bold p-4 rounded-xl hover:bg-gray-200 transition"
            >
              Prenota via Email
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

function AgendaPanel() {

const [bookings, setBookings] = useState([]);
const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {

    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("booking_date", { ascending: true });

    setBookings(data || []);
  };

 return (
  <section className="py-24 px-6 bg-zinc-950">

    <div className="max-w-6xl mx-auto">

      <h2 className="text-4xl font-bold text-yellow-500 text-center mb-12">
        Agenda Studio
      </h2>

      <div className="grid lg:grid-cols-2 gap-10">

        <div className="bg-black p-6 rounded-3xl border border-yellow-500">

          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="rounded-2xl border-none w-full"
            tileClassName={({ date }) => {

              const formatted = date
                .toISOString()
                .split("T")[0];

              const occupied = bookings.some(
                (booking) =>
                  booking.booking_date === formatted
              );

              return occupied
                ? "bg-red-600 text-white rounded-xl"
                : "";
            }}
          />

        </div>

        <div>

          <h3 className="text-2xl font-bold text-yellow-500 mb-6">
            Appuntamenti
          </h3>

          <div className="space-y-4">

            {bookings
              .filter((booking) => {

                const selected =
                  selectedDate
                    .toISOString()
                    .split("T")[0];

                return (
                  booking.booking_date === selected
                );
              })
              .map((booking) => (

                <div
                  key={booking.id}
                  className="bg-red-950 border border-yellow-500 rounded-3xl p-6"
                >

                  <p className="text-red-300 text-sm mb-2">
                    Giorno occupato
                  </p>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {booking.booking_time}
                  </h3>

                  <div className="space-y-2 text-gray-200">

                    <p>
                      <span className="font-bold">
                        Cliente:
                      </span>{" "}
                      {booking.patient_name}
                    </p>

                    <p>
                      <span className="font-bold">
                        Servizio:
                      </span>{" "}
                      {booking.service}
                    </p>

                  </div>

                </div>

              ))}

          </div>

        </div>

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

const [user, setUser] = useState(null);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

useEffect(() => {

  supabase.auth.getSession()
    .then(({ data }) => {
      setUser(data.session?.user || null);
    });

}, []);

const login = async () => {

  const { error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    alert("Login non valido");
    return;
  }

  const { data } =
    await supabase.auth.getSession();

  setUser(data.session?.user || null);
};

const logout = async () => {

  await supabase.auth.signOut();

  setUser(null);
};

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
                className="bg-zinc-900 rounded-3xl p-6 border border-yellow-700"
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

      <AgendaPanel />

      {user ? (

  <div>

    <div className="flex justify-center py-6">

      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-500 px-6 py-3 rounded-2xl"
      >
        Logout Admin
      </button>

    </div>

    <AdminPanel />

  </div>

) : (

  <section className="py-24 px-6 bg-black">

    <div className="max-w-md mx-auto bg-zinc-900 border border-yellow-700 rounded-3xl p-8">

      <h2 className="text-3xl font-bold text-yellow-500 mb-8 text-center">
        Login Admin
      </h2>

      <div className="space-y-4">

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-black border border-yellow-700 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-black border border-yellow-700 text-white"
        />

        <button
          onClick={login}
          className="w-full bg-yellow-500 text-black font-bold p-4 rounded-xl hover:bg-yellow-400"
        >
          Accedi
        </button>

      </div>

    </div>

  </section>

)}

      <footer className="border-t border-yellow-700 py-8 text-center text-gray-400">

        <p>Fabio Biestra – Chinesiologo</p>

        <p>Provincia di Pisa</p>

      </footer>

    </div>
  );
}