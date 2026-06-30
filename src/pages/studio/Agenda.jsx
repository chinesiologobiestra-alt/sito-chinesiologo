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

  const lista = useMemo(() => {

    return appuntamenti.filter((a) => {

      const nome =
        (a.patient_name || "").toLowerCase();

      return nome.includes(
        ricerca.toLowerCase()
      );

    });

  }, [appuntamenti, ricerca]);

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
        onChange={(e) =>
          setRicerca(e.target.value)
        }
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

      <div className="space-y-4">

        {lista.length === 0 && (

          <div className="bg-white rounded-xl p-8 text-center text-zinc-500 shadow">

            Nessun appuntamento.

          </div>

        )}

        {lista.map((a) => (

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

            <div className="flex justify-between">

              <div>

                <h2 className="text-lg font-bold">

                  {a.patient_name}

                </h2>

                <p className="text-zinc-500">

                  {a.service}

                </p>

              </div>

              <div className="text-right">

                <div className="font-semibold">

                  {a.booking_date}

                </div>

                <div className="text-yellow-600 font-bold text-lg">

                  {a.booking_time}

                </div>

              </div>

            </div>

            <div className="mt-4 grid md:grid-cols-2 gap-3 text-sm">

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

    </Layout>

  );

}