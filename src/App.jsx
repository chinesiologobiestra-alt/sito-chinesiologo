import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import jsPDF from "jspdf";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import News from "./pages/News";
import ContentManager from "./components/ContentManager";
import NewsPost from "./pages/NewsPost";
import WeeklyAgenda from "./components/WeeklyAgenda";
import { format } from "date-fns";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import CookieBanner from "./components/CookieBanner";
import Dashboard from "./pages/studio/Dashboard";
import Valutazione from "./pages/studio/Valutazione";
import Pazienti from "./pages/studio/Pazienti";
import Paziente from "./pages/studio/Paziente";
import Archivio from "./pages/studio/Archivio";
import Agenda from "./pages/studio/Agenda";
import Programma from "./pages/studio/Programma";

function Prenotazione() {

 const [form, setForm] = useState({
  nome: "",
  email: "",
  telefono: "",
  servizio: "",
  sede: "",
  data: "",
  ora: "",
});

  const [availableTimes, setAvailableTimes] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [errors, setErrors] = useState({});


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
doc.text("SEDE", 30, 214);

doc.setFontSize(16);
doc.text(form.sede || "-", 30, 224);

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

  
  const handleChange = async (e) => {

    const updatedForm = {
  ...form,
  [e.target.name]: e.target.value,
};

if (e.target.name === "sede") {
  updatedForm.data = "";
  updatedForm.ora = "";
  setAvailableTimes([]);
}

const { data: slots } = await supabase
  .from("availability_slots")
  .select("slot_date")
  .eq("available", true)
  .eq("location", e.target.value);

setAvailableDates([
  ...new Set(
    (slots || []).map(
      slot => slot.slot_date
    )
  )
]);

setForm(updatedForm);

if (e.target.name === "data") {

  const formatted =
    new Date(e.target.value)
      .toISOString()
      .split("T")[0];

  const { data, error } = await supabase
    .from("availability_slots")
    .select("*")
    .eq("slot_date", formatted)
    .eq("available", true);

  if (error) {
    console.log(error);
    return;
  }

setAvailableTimes([
  ...new Set(
    data.map(slot => slot.slot_time)
  )
]);

}
};

  const invia = async () => {

   const newErrors = {};

if (!form.nome) newErrors.nome = true;
if (!form.telefono) newErrors.telefono = true;
if (!form.email) newErrors.email = true;
if (!form.servizio) newErrors.servizio = true;
if (!form.sede) newErrors.sede = true;
if (!form.data) newErrors.data = true;
if (!form.ora) newErrors.ora = true;

if (Object.keys(newErrors).length > 0) {
  setErrors(newErrors);
  setErrorMessage(
    "Compila tutti i campi obbligatori"
  );
  return;
}

setErrors({});
setErrorMessage("");

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

 await supabase
  .from("availability_slots")
  .update({
    available: false,
    location: "occupied",
  })
  .eq(
    "slot_date",
    new Date(form.data)
      .toISOString()
      .split("T")[0]
  )
  .eq("slot_time", form.ora);

  const { data: updated, error: updateError } =
  await supabase
    .from("availability_slots")
    .update({
      available: false,
      location: "occupied",
    })
    .eq(
      "slot_date",
      new Date(form.data)
        .toISOString()
        .split("T")[0]
    )
    .eq("slot_time", form.ora)
    .select();

console.log("UPDATE ERROR:", updateError);
console.log("UPDATED:", updated);

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
  sede: form.sede,
}),

});

if (!response.ok) {

  const errorText =
  await response.text();

console.log(errorText);

alert(errorText);

return;
}

;

console.log(await response.text());

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
            className={`w-full p-4 rounded-xl bg-black text-white ${
  errors.nome
    ? "border-2 border-red-500"
    : "border border-yellow-700"
}`}
          />

          <input
            name="telefono"
            placeholder="Telefono"
            onChange={handleChange}
            className={`w-full p-4 rounded-xl bg-black text-white ${
  errors.telefono
    ? "border-2 border-red-500"
    : "border border-yellow-700"
}`}
          />
<input
  type="email"
  name="email"
  placeholder="Email"
  onChange={handleChange}
  className={`w-full p-4 rounded-xl bg-black text-white ${
  errors.email
    ? "border-2 border-red-500"
    : "border border-yellow-700"
}`}
/>
          <select
  name="servizio"
  onChange={handleChange}
  className={`w-full p-4 rounded-xl bg-black text-white ${
  errors.servizio
    ? "border-2 border-red-500"
    : "border border-yellow-700"
}`}
>
  <option value="">Seleziona servizio</option>

  <option value="Valutazione chinesiologica">
    Valutazione chinesiologica
  </option>

  <option value="Rieducazione posturale">
    Rieducazione posturale
  </option>

  <option value="Recupero infortuni e dolore">
    Recupero infortuni e dolore
  </option>

  <option value="Dimagrimento funzionale">
    Dimagrimento funzionale
  </option>

  <option value="Allenamento personalizzato">
    Allenamento personalizzato
  </option>

  <option value="Benessere e prevenzione">
    Benessere e prevenzione
  </option>
</select>

<select
  name="sede"
  onChange={handleChange}
  className={`w-full p-4 rounded-xl bg-black text-white ${
  errors.sede
    ? "border-2 border-red-500"
    : "border border-yellow-700"
}`}
>
  <option value="">Seleziona sede</option>

<option value="studio1">
  Studio Provvisorio
</option>

<option value="studio2">
  Studio Provvisorio 2
</option>
</select>

<div className="relative">

  <button
  type="button"
  onClick={() =>
    setShowCalendar(!showCalendar)
  }
  className={`w-full p-4 rounded-xl bg-black text-white text-left ${
  errors.data
    ? "border-2 border-red-500"
    : "border border-yellow-700"
}`}
>
  {form.data || "Seleziona data"}
</button>

  {showCalendar && (

  <div className="absolute z-50 mt-3">

    <Calendar
  tileDisabled={({ date }) => {

    const formatted =
      format(date, "yyyy-MM-dd");

    return !availableDates.includes(
      formatted
    );

  }}

  tileClassName={({ date }) => {

    const formatted =
      format(date, "yyyy-MM-dd");

    return availableDates.includes(formatted)
      ? "available-day"
      : "";

  }}


  onChange={async (date) => {

    const formatted =
      format(date, "yyyy-MM-dd");

    setForm((prev) => ({
      ...prev,
      data: formatted,
    }));

    const { data: slots } = await supabase
      .from("availability_slots")
      .select("*")
      .eq("slot_date", formatted)
      .eq("available", true)
      .eq("location", form.sede);

    setAvailableTimes([
      ...new Set(
        (slots || []).map(
          slot => slot.slot_time
        )
      )
    ]);

    setShowCalendar(false);

  }}

  value={new Date()}
  className="premium-calendar"
/>

</div>

)}
</div>


          <select
            name="ora"
            onChange={handleChange}
            className={`w-full p-4 rounded-xl bg-black text-white ${
  errors.ora
    ? "border-2 border-red-500"
    : "border border-yellow-700"
}`}
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

          {errorMessage && (
  <div className="bg-red-900 border border-red-500 text-red-200 p-4 rounded-xl">
    {errorMessage}
  </div>
)}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
            className="agenda-calendar"
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

  const { data: booking } =
    await supabase
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();

  await supabase
  .from("availability_slots")
  .update({
    available: true,
    location: "studio1",
  })
  .eq(
    "slot_date",
    booking.booking_date
  )
  .eq(
    "slot_time",
    booking.booking_time
  );

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

const maintenanceMode = true;

export default function App() {

const navigate = useNavigate();

 if (maintenanceMode) {

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="text-center max-w-2xl">

        <img
          src="/logo.png"
          alt="Fabio Biestra Logo"
          className="w-40 h-40 object-contain mx-auto mb-8"
        />

        <h1 className="text-6xl font-bold text-yellow-500 mb-8">
          Fabio Biestra
        </h1>

        <p className="text-2xl text-white mb-6">
          Sito in aggiornamento
        </p>

        <p className="text-gray-400 leading-8">
          Sto lavorando alla nuova piattaforma professionale.
          Il sito sarà disponibile a breve.
        </p>

      </div>

    </div>

  );
}

const [user, setUser] = useState(null);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showLogin, setShowLogin] = useState(false);

useEffect(() => {

  supabase.auth.getSession()
    .then(({ data }) => {
      setUser(data.session?.user || null);
      setShowLogin(false);
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


  setShowLogin(false);

  navigate("/studio");

};


const logout = async () => {

  await supabase.auth.signOut();

  setUser(null);

  navigate("/");

};
  const services = [
  {
    title: "Valutazione chinesiologica",
    description:
      "Analisi della postura e del movimento per individuare squilibri e definire un percorso personalizzato.",
  },
  {
    title: "Rieducazione posturale",
    description:
      "Percorsi specifici per migliorare l'allineamento corporeo, la mobilità e il controllo motorio.",
  },
  {
    title: "Recupero infortuni e dolore",
    description:
      "Programmi progressivi per favorire il recupero funzionale e il ritorno alle normali attività quotidiane.",
  },
  {
    title: "Dimagrimento funzionale",
    description:
      "Attività motoria personalizzata finalizzata al miglioramento della composizione corporea e del benessere generale.",
  },
  {
    title: "Allenamento personalizzato",
    description:
      "Programmi costruiti sulle tue esigenze, sul livello di partenza e sugli obiettivi da raggiungere.",
  },
  {
    title: "Benessere e prevenzione",
    description:
      "Percorsi dedicati al mantenimento della salute, alla prevenzione e alla promozione di uno stile di vita attivo.",
  },
];

  const [latestPosts, setLatestPosts] = useState([]);
const [latestNews, setLatestNews] = useState([]);

  const faq = [
  {
    q: "Cos'è la chinesiologia?",
    a: "La chinesiologia studia il movimento umano e il suo ruolo nel mantenimento e nel miglioramento del benessere della persona.",
  },
  {
    q: "A chi si rivolgono i percorsi?",
    a: "I percorsi sono rivolti a persone di ogni età che desiderano migliorare il proprio benessere, la postura, la qualità del movimento o adottare uno stile di vita più attivo.",
  },
  {
    q: "Posso iniziare anche se sono sedentario?",
    a: "Sì. Ogni percorso viene adattato al livello di partenza della persona e costruito in modo graduale e sostenibile.",
  },
  {
    q: "Serve una preparazione fisica particolare?",
    a: "No. Gli esercizi e le attività vengono personalizzati in base alle caratteristiche individuali e agli obiettivi da raggiungere.",
  },
  {
    q: "Come si svolge il primo incontro?",
    a: "Il primo appuntamento prevede un colloquio iniziale e una valutazione del movimento e della postura per comprendere esigenze e obiettivi della persona.",
  },
  {
    q: "Quanto dura una seduta?",
    a: "La durata può variare in base al percorso, ma generalmente una seduta ha una durata compresa tra 45 e 60 minuti.",
  },
  {
    q: "Posso svolgere attività fisica se ho avuto infortuni o periodi di inattività?",
    a: "Nella maggior parte dei casi sì, attraverso un percorso adeguato alle proprie condizioni e sviluppato con gradualità.",
  },
  {
    q: "Quali benefici può portare un percorso chinesiologico?",
    a: "Miglioramento della postura, maggiore mobilità, incremento della consapevolezza corporea, benessere generale e promozione di uno stile di vita attivo.",
  },
  {
    q: "Esiste un collegamento tra movimento e benessere mentale?",
    a: "Il movimento regolare può contribuire al benessere generale della persona, favorendo una migliore percezione di sé e aiutando nella gestione delle tensioni quotidiane.",
  },
  {
    q: "Come posso prenotare una consulenza?",
    a: "È possibile prenotare direttamente tramite il modulo presente sul sito oppure contattarmi telefonicamente o via email.",
  },
];

  useEffect(() => {

  loadHomepageContent();

}, []);

const loadHomepageContent = async () => {

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", {
      ascending: false,
    })
    .limit(3);

  const { data: news } = await supabase
    .from("news_posts")
    .select("*")
    .order("created_at", {
      ascending: false,
    })
    .limit(2);

  setLatestPosts(posts || []);
  setLatestNews(news || []);
};

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

return (

  <Routes>

    <Route
      path="/blog"
      element={<Blog />}
    />

    <Route
      path="/blog/:slug"
      element={<BlogPost />}
    />

    <Route
      path="/news"
      element={<News />}
    />

    <Route
      path="/news/:id"
      element={<NewsPost />}
    />

    <Route
      path="/privacy-policy"
      element={<PrivacyPolicy />}
    />

    <Route
      path="/cookie-policy"
      element={<CookiePolicy />}
    />

    <Route
  path="/studio"
  element={<Dashboard />}
/>

<Route
  path="/studio/pazienti"
  element={<Pazienti />}
/>

<Route
  path="/studio/pazienti/:id"
  element={<Paziente />}
/>

<Route
  path="/studio/archivio"
  element={<Archivio />}
/>

<Route
    path="/studio/valutazione"
    element={<Valutazione />}
/>

<Route
  path="/studio/agenda"
  element={<Agenda />}
/>

<Route
  path="/studio/programmi"
  element={<Programma />}
/>


    <Route
      path="/"
      element={

<div className="bg-black text-white min-h-screen">

      <header className="sticky top-0 z-50 bg-black border-b border-yellow-700">

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex justify-between items-center">

  <a
  href="/"
  className="flex items-center gap-4"
>

  <img
    src="/logo.png"
    alt="Fabio Biestra Logo"
    className="w-24 h-24 object-contain"
  />

  <div>

    <h1 className="text-yellow-500 text-3xl font-bold leading-none">
      Fabio Biestra
    </h1>

    <p className="text-base text-gray-400 mt-2">
      Chinesiologo
    </p>

  </div>

</a>

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

            <a
              href="/blog"
              className="hover:text-yellow-500 transition"
            >
              Blog
            </a>

            <a
              href="/news"
              className="hover:text-yellow-500 transition"
            >
              News
            </a>

            <button
              onClick={() => scrollTo("contatti")}
              className="hover:text-yellow-500 transition"
            >
              Contatti
            </button>

            <button onClick={() => scrollTo("prenota")}>
              Prenota
            </button>

            <button
              onClick={() => setShowLogin(true)}
              className="hover:text-yellow-500 transition"
            >
              Accedi
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

<p className="text-gray-300 leading-8 text-lg">
  Sono Fabio Biestra, laureato in Scienze delle
  Attività Motorie e Sportive, specializzato nel
  benessere della persona attraverso il movimento.

  <br /><br />

  Il mio obiettivo è aiutarti a migliorare postura,
  qualità del movimento e benessere generale
  attraverso percorsi personalizzati costruiti
  sulle tue esigenze.
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

          <h2 className="text-3xl md:text-4xl text-yellow-500 font-bold text-center mb-12">
            Servizi
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

  {services.map((service) => (

    <div
      key={service.title}
      className="bg-zinc-900 rounded-3xl p-8 border border-yellow-700 hover:border-yellow-500 transition"
    >

      <h3 className="text-yellow-400 font-semibold text-2xl mb-4">
        {service.title}
      </h3>

      <p className="text-gray-300 leading-7 mb-6">
        {service.description}
      </p>

      <button
        onClick={() => scrollTo("prenota")}
        className="text-yellow-500 hover:text-yellow-400 font-semibold"
      >
        Prenota una consulenza →
      </button>

    </div>

  ))}

</div>

        </div>

      </section>

      <section id="metodo" className="py-24 px-6 bg-black">

  <div className="max-w-7xl mx-auto">

    <div className="text-center mb-16">

      <p className="uppercase tracking-[0.3em] text-yellow-500 mb-3">
        Il mio metodo
      </p>

      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Un percorso costruito
        <span className="text-yellow-500">
          {" "}sulle tue esigenze
        </span>
      </h2>

      <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-8">
        Ogni persona è diversa. Per questo motivo ogni percorso
        viene sviluppato partendo da una valutazione iniziale e
        adattato nel tempo in base ai progressi e agli obiettivi
        individuali.
      </p>

    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      <div className="bg-zinc-900 border border-yellow-700 rounded-3xl p-8">
        <div className="text-4xl font-bold text-yellow-500 mb-4">
          01
        </div>

        <h3 className="text-xl font-semibold text-white mb-4">
          Colloquio iniziale
        </h3>

        <p className="text-gray-300 leading-7">
          Analisi delle esigenze, delle abitudini quotidiane
          e degli obiettivi da raggiungere.
        </p>
      </div>

      <div className="bg-zinc-900 border border-yellow-700 rounded-3xl p-8">
        <div className="text-4xl font-bold text-yellow-500 mb-4">
          02
        </div>

        <h3 className="text-xl font-semibold text-white mb-4">
          Valutazione
        </h3>

        <p className="text-gray-300 leading-7">
          Osservazione della postura e analisi del movimento
          per individuare eventuali squilibri funzionali.
        </p>
      </div>

      <div className="bg-zinc-900 border border-yellow-700 rounded-3xl p-8">
        <div className="text-4xl font-bold text-yellow-500 mb-4">
          03
        </div>

        <h3 className="text-xl font-semibold text-white mb-4">
          Programma personalizzato
        </h3>

        <p className="text-gray-300 leading-7">
          Definizione di un percorso specifico costruito
          sulle caratteristiche e sugli obiettivi della persona.
        </p>
      </div>

      <div className="bg-zinc-900 border border-yellow-700 rounded-3xl p-8">
        <div className="text-4xl font-bold text-yellow-500 mb-4">
          04
        </div>

        <h3 className="text-xl font-semibold text-white mb-4">
          Monitoraggio
        </h3>

        <p className="text-gray-300 leading-7">
          Verifica dei progressi e aggiornamento del programma
          per ottenere risultati concreti e duraturi.
        </p>
      </div>

    </div>

  </div>

</section>
      <section className="bg-zinc-950 py-24 px-6">

  <div className="max-w-7xl mx-auto">

    <div className="text-center mb-16">

      <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-6">
        Il movimento come strumento di benessere
      </h2>

      <p className="text-gray-300 text-lg leading-8 max-w-3xl mx-auto">
        Il movimento rappresenta una risorsa fondamentale per il benessere
        della persona. Attraverso percorsi personalizzati è possibile
        migliorare la funzionalità del corpo, aumentare la consapevolezza
        corporea e favorire una migliore qualità della vita quotidiana.
      </p>

    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      <div className="bg-black border border-yellow-700 rounded-3xl p-8">

        <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
          Personalizzazione
        </h3>

        <p className="text-gray-300 leading-7">
          Ogni percorso viene adattato alle caratteristiche,
          alle esigenze e agli obiettivi della persona.
        </p>

      </div>

      <div className="bg-black border border-yellow-700 rounded-3xl p-8">

        <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
          Consapevolezza corporea
        </h3>

        <p className="text-gray-300 leading-7">
          Comprendere il proprio corpo e il proprio movimento
          è il primo passo verso un miglior equilibrio funzionale.
        </p>

      </div>

      <div className="bg-black border border-yellow-700 rounded-3xl p-8">

        <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
          Corpo e mente
        </h3>

        <p className="text-gray-300 leading-7">
          Corpo e mente sono strettamente collegati.
          Il movimento può contribuire al benessere generale,
          favorendo una migliore gestione delle tensioni e dello stress.
        </p>

      </div>

      <div className="bg-black border border-yellow-700 rounded-3xl p-8">

        <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
          Continuità
        </h3>

        <p className="text-gray-300 leading-7">
          Piccoli cambiamenti sostenibili nel tempo possono
          portare benefici duraturi per la salute e la qualità della vita.
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

      <section className="py-24 px-6 bg-zinc-950">

  <div className="max-w-7xl mx-auto">

    <div className="flex justify-between items-center mb-14">

      <h2 className="text-4xl font-bold text-yellow-500">
        Ultimi Articoli
      </h2>

      <a
        href="/blog"
        className="text-yellow-400 hover:text-yellow-300"
      >
        Vedi tutto →
      </a>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {latestPosts.map((post) => (

        <a
          key={post.id}
          href={`/blog/${post.slug}`}
          className="bg-black rounded-3xl overflow-hidden border border-yellow-700 hover:scale-[1.02] transition"
        >

          {post.image_url && (

            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-56 object-cover"
            />

          )}

          <div className="p-6">

            <h3 className="text-2xl font-bold text-yellow-400 mb-4">
              {post.title}
            </h3>

             <p className="text-gray-300 leading-7 line-clamp-3">
  {post.content
    ?.replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .substring(0, 180)}...
</p>

          </div>

        </a>

      ))}

    </div>

  </div>

</section>

<section className="py-24 px-6 bg-black">

  <div className="max-w-7xl mx-auto">

    <div className="flex justify-between items-center mb-14">

      <h2 className="text-4xl font-bold text-yellow-500">
        News & Eventi
      </h2>

      <a
        href="/news"
        className="text-yellow-400 hover:text-yellow-300"
      >
        Vedi tutto →
      </a>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

      {latestNews.map((item) => (

<a
  href={`/news/${item.id}`}
  key={item.id}
  className="block bg-zinc-900 border border-yellow-700 rounded-3xl overflow-hidden hover:scale-[1.01] transition"
>

          {item.image_url && (

            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-72 object-cover"
            />

          )}

          <div className="p-8">

            <h3 className="text-3xl font-bold text-yellow-400 mb-5">
              {item.title}
            </h3>

            <p className="text-gray-300 leading-8 line-clamp-3">
  {item.content
    ?.replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .substring(0, 180)}...
</p>

                    </div>

        </a>

      ))}

    </div>

  </div>

</section>

      <Prenotazione />

      <WeeklyAgenda user={user} />

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
<div className="max-w-6xl mx-auto py-10">

  <h2 className="text-4xl font-bold text-center text-yellow-500 mb-10">
    Gestionale Studio
  </h2>

<p className="text-center text-gray-400 mb-12 text-lg">
  Seleziona l'area del gestionale che desideri utilizzare.
</p>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

    <button
      onClick={() => navigate("/studio/pazienti")}
     className="bg-zinc-900 border border-yellow-600 rounded-3xl p-8 hover:border-yellow-400 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] transition-all duration-300"
    >
      <div className="text-5xl mb-4">
        👥
      </div>

      <h3 className="text-yellow-500 font-bold text-xl">
        Gestione Pazienti
      </h3>

      <p className="text-gray-400 mt-2">
        Anagrafica e valutazioni
      </p>

    </button>


    <button
  onClick={() => navigate("/studio/archivio")}
  className="bg-zinc-900 border border-yellow-600 rounded-3xl p-8 hover:border-yellow-400 hover:scale-[1.02] transition-all duration-300"
>
  <div className="text-5xl mb-4">
    📁
  </div>

  <h3 className="text-yellow-500 font-bold text-xl">
    Archivio
  </h3>

  <p className="text-gray-400 mt-2">
    Cartelle cliniche
  </p>
</button>

    <button
  onClick={() => navigate("/studio/programmi")}
  className="bg-zinc-900 border border-yellow-600 rounded-3xl p-8 hover:border-yellow-400 hover:scale-[1.02] transition-all duration-300"
>

  <div className="text-5xl mb-4">
    💪
  </div>

  <h3 className="text-yellow-500 font-bold text-xl">
    Programmi
  </h3>

  <p className="text-gray-400 mt-2">
    Programmi di allenamento
  </p>

</button>

    <button
  onClick={() => navigate("/studio/agenda")}
  className="bg-zinc-900 border border-yellow-600 rounded-3xl p-8 hover:border-yellow-400 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] transition-all duration-300"
>
  <div className="text-5xl mb-4">
    📅
  </div>

  <h3 className="text-yellow-500 font-bold text-xl">
    Agenda
  </h3>

  <p className="text-gray-400 mt-2">
    Appuntamenti prenotati
  </p>

</button>

    
  </div>

</div>

    <AdminPanel />

    <ContentManager />

  </div>


 ) : null}
 {showLogin && !user && (

  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">

    <div className="relative w-full max-w-sm bg-zinc-900 rounded-3xl p-10 border border-yellow-700">

      <button
        onClick={() => setShowLogin(false)}
        className="absolute top-4 right-4 text-white text-xl"
      >
        ✕
      </button>

      <div className="text-center mb-10">

        <h1 className="text-5xl font-bold text-yellow-500 mb-3">
          FB
        </h1>

        <p className="text-gray-400 uppercase text-sm">
          Area Riservata Admin
        </p>

      </div>

      <div className="space-y-5">

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-2xl bg-black border border-yellow-700/20 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-2xl bg-black border border-yellow-700/20 text-white"
        />

        <button
          onClick={login}
          className="w-full bg-yellow-500 text-black font-bold p-4 rounded-2xl hover:bg-yellow-400 transition"
        >
          Accedi
        </button>

      </div>

    </div>

  </div>

)}

<CookieBanner />

<footer
  id="contatti"
  className="border-t border-yellow-700/20 py-12 px-6 bg-black"
>

  <div className="max-w-7xl mx-auto text-center">

    <h3 className="text-3xl font-bold text-yellow-500 mb-4">
      Fabio Biestra
    </h3>

    <p className="text-gray-400 mb-8">
      Chinesiologo
    </p>

    <div className="grid md:grid-cols-2 gap-6 text-gray-300 max-w-2xl mx-auto">

      <div className="bg-zinc-900 rounded-2xl p-6 border border-yellow-700/20">

        <p className="text-yellow-500 mb-2 font-semibold">
          Telefono
        </p>

        <a
          href="tel:+393425620513"
          className="hover:text-yellow-400 transition"
        >
          +39 342 562 0513
        </a>

      </div>

      <div className="bg-zinc-900 rounded-2xl p-6 border border-yellow-700/20">

        <p className="text-yellow-500 mb-2 font-semibold">
          Email
        </p>

        <a
          href="mailto:info@fabiobiestrachinesiologo.it"
          className="hover:text-yellow-400 transition break-all"
        >
          info@fabiobiestrachinesiologo.it
        </a>

      </div>

    </div>

    <div className="mt-10 flex justify-center gap-6 text-sm">

  <a
    href="/privacy-policy"
    className="text-gray-400 hover:text-yellow-500"
  >
    Privacy Policy
  </a>

  <a
    href="/cookie-policy"
    className="text-gray-400 hover:text-yellow-500"
  >
    Cookie Policy
  </a>

</div>

    <div className="mt-10 text-sm text-gray-500">

      © {new Date().getFullYear()} Fabio Biestra.
      Tutti i diritti riservati.

    </div>

  </div>

</footer>

        </div>

      }
    />

  </Routes>

  );
}