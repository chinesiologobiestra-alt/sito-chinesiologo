
import { useEffect, useMemo, useState } from "react";
import { getBookings } from "../../services/bookingsService";
import Layout from "../../components/studio/Layout";

export default function Agenda() {
  const [appuntamenti, setAppuntamenti] = useState([]);
  const [ricerca, setRicerca] = useState("");
  const [servizioFiltro, setServizioFiltro] = useState("Tutti");

  useEffect(() => {
    caricaAppuntamenti();
  }, []);

  async function caricaAppuntamenti() {
  try {
    const data = await getBookings();
    setAppuntamenti(data);
  } catch (err) {
    console.error(err);
  }
}

  const formattaData = (data) =>
    new Date(data).toLocaleDateString("it-IT", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const servizi = [
    "Tutti",
    ...new Set(appuntamenti.map((a) => a.service).filter(Boolean)),
  ];

  const gruppi = useMemo(() => {
    const filtrati = appuntamenti.filter((a) => {
      const nome = (a.patient_name || "").toLowerCase();
      const okNome = nome.includes(ricerca.toLowerCase());
      const okServizio =
        servizioFiltro === "Tutti" || a.service === servizioFiltro;
      return okNome && okServizio;
    });

    return filtrati.reduce((acc, a) => {
      acc[a.booking_date] ??= [];
      acc[a.booking_date].push(a);
      return acc;
    }, {});
  }, [appuntamenti, ricerca, servizioFiltro]);

  const oggi = new Date().toISOString().split("T")[0];

  const stats = {
    oggi: appuntamenti.filter((a) => a.booking_date === oggi).length,
    settimana: appuntamenti.length,
    pazienti: new Set(appuntamenti.map((a) => a.patient_name)).size,
  };

  const badge = (s) => {
    switch (s) {
      case "Valutazione":
      case "Valutazione chinesiologica":
        return "bg-yellow-100 text-yellow-700";
      case "Controllo":
        return "bg-green-100 text-green-700";
      case "Allenamento":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-zinc-100 text-zinc-700";
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold">Agenda</h1>
          <p className="text-zinc-500 mt-2">
            Gestisci gli appuntamenti dei pazienti.
          </p>
        </div>

        <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-3 rounded-xl shadow">
          + Nuovo appuntamento
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card titolo="Oggi" valore={stats.oggi} />
        <Card titolo="Questa settimana" valore={stats.settimana} />
        <Card titolo="Pazienti" valore={stats.pazienti} />
      </div>

      <div className="bg-white rounded-2xl shadow p-5 mb-8 flex flex-col md:flex-row gap-4">
        <input
          value={ricerca}
          onChange={(e) => setRicerca(e.target.value)}
          placeholder="🔍 Cerca paziente..."
          className="flex-1 border rounded-xl px-4 py-3"
        />
        <select
          value={servizioFiltro}
          onChange={(e) => setServizioFiltro(e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          {servizi.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="space-y-8">
        {Object.entries(gruppi).map(([data, lista]) => (
          <div key={data}>
            <div className={`rounded-xl px-5 py-3 mb-4 flex justify-between ${data===oggi?"bg-yellow-500 text-black":"bg-zinc-900 text-white"}`}>
              <h2 className="font-bold capitalize">
                {data===oggi?"OGGI • ":""}{formattaData(data)}
              </h2>
              <span>{lista.length} appuntamento{lista.length!==1?"i":""}</span>
            </div>

            <div className="space-y-4">
              {lista.map((a)=>(
                <div key={a.id} className="bg-white rounded-2xl border shadow p-6">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-3xl font-bold text-yellow-600">{a.booking_time}</div>
                      <h3 className="text-xl font-bold mt-2">{a.patient_name}</h3>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${badge(a.service)}`}>{a.service}</span>
                    </div>
                    <div className="text-right text-sm text-zinc-600">
                      <div>📞 {a.patient_phone}</div>
                      <div className="mt-2">✉ {a.patient_email}</div>
                    </div>
                  </div>

                  <div className="border-t mt-6 pt-4 flex gap-3">
                    <button className="px-4 py-2 rounded-lg bg-zinc-900 text-white">Apri</button>
                    <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">Modifica</button>
                    <button className="px-4 py-2 rounded-lg bg-red-600 text-white">Elimina</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

function Card({ titolo, valore }) {
  return (
    <div className="bg-white rounded-2xl shadow border p-6">
      <div className="text-zinc-500 text-sm">{titolo}</div>
      <div className="text-4xl font-bold mt-2">{valore}</div>
    </div>
  );
}
