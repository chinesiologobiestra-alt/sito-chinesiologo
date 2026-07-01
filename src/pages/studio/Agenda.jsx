import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import Layout from "../../components/studio/Layout";

export default function Agenda() {
  const [appuntamenti, setAppuntamenti] = useState([]);
  const [ricerca, setRicerca] = useState("");

  useEffect(() => {
    caricaAppuntamenti();
  }, []);

  async function caricaAppuntamenti() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("booking_date", { ascending: true })
      .order("booking_time", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setAppuntamenti(data || []);
  }

  const gruppi = useMemo(() => {
    const filtrati = appuntamenti.filter((a) => {
      const nome = (a.patient_name || "").toLowerCase();

      return nome.includes(ricerca.toLowerCase());
    });

    const gruppi = {};

    filtrati.forEach((a) => {
      if (!gruppi[a.booking_date]) {
        gruppi[a.booking_date] = [];
      }

      gruppi[a.booking_date].push(a);
    });

    return gruppi;
  }, [appuntamenti, ricerca]);

  const oggi = new Date().toISOString().split("T")[0];

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-2">
        Agenda
      </h1>

      <p className="text-zinc-500 mb-6">
        Appuntamenti prenotati.
      </p>

      <input
        placeholder="🔍 Cerca paziente..."
        value={ricerca}
        onChange={(e) => setRicerca(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-zinc-300
          px-4
          py-3
          mb-6
        "
      />

      {Object.keys(gruppi).length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center text-zinc-500 shadow">
          Nessun appuntamento.
        </div>
      )}

      <div className="space-y-8">
        {Object.entries(gruppi).map(([data, appuntamenti]) => {
          const isOggi = data === oggi;

          return (
            <div key={data}>
              <div
                className={`
                  rounded-xl
                  px-5
                  py-3
                  mb-4
                  flex
                  justify-between
                  items-center
                  ${
                    isOggi
                      ? "bg-yellow-500 text-black"
                      : "bg-zinc-900 text-white"
                  }
                `}
              >
                <h2 className="text-lg font-bold">
                  {isOggi ? "OGGI • " : ""}
                  {data}
                </h2>

                <span className="text-sm">
                  {appuntamenti.length} appuntamento
                  {appuntamenti.length > 1 ? "i" : ""}
                </span>
              </div>

              <div className="space-y-4">
                {appuntamenti.map((a) => (
                  <div
                    key={a.id}
                    className="
                      bg-white
                      rounded-xl
                      shadow
                      border
                      border-zinc-200
                      p-5
                    "
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold">
                          {a.patient_name}
                        </h2>

                        <p className="text-zinc-500 mt-1">
                          {a.service}
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="text-3xl font-bold text-yellow-600">
                          {a.booking_time}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 grid md:grid-cols-2 gap-3 text-sm text-zinc-700">
                      <div>
                        📞 {a.patient_phone}
                      </div>

                      <div>
                        ✉ {a.patient_email}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}