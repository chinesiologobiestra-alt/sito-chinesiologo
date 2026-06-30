import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import Layout from "../../components/studio/Layout";

export default function Archivio() {

  const navigate = useNavigate();

  const [pazienti, setPazienti] = useState([]);
  const [valutazioni, setValutazioni] = useState([]);
  const [ricerca, setRicerca] = useState("");
  const [aperti, setAperti] = useState({});

  useEffect(() => {

    async function carica() {

      /* ========================= */
      /* PAZIENTI */
      /* ========================= */

      const { data: p, error: errorePazienti } = await supabase
        .from("pazienti")
        .select("*")
        .order("cognome");

      if (errorePazienti) {
        console.error("Errore pazienti:", errorePazienti);
      }

      /* ========================= */
      /* VALUTAZIONI */
      /* ========================= */

      const { data: v, error: erroreValutazioni } = await supabase
        .from("valutazioni")
        .select("*")
        .order("data_valutazione", {
          ascending: false,
        });

      console.log("VALUTAZIONI:", v);
      console.log("ERRORE:", erroreValutazioni);

      if (erroreValutazioni) {
        console.error(erroreValutazioni);
      }

      setPazienti(p || []);
      setValutazioni(v || []);

    }

    carica();

  }, []);

  const elenco = useMemo(() => {

    return pazienti.filter((p) => {

      const nome =
        `${p.nome} ${p.cognome}`.toLowerCase();

      return nome.includes(
        ricerca.toLowerCase()
      );

    });

  }, [pazienti, ricerca]);

  function toggle(id) {

    setAperti((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

  }

  return (

    <Layout>

      <h1 className="text-3xl font-bold mb-6">

        Archivio

      </h1>

      <input
        placeholder="🔍 Cerca paziente..."
        value={ricerca}
        onChange={(e) =>
          setRicerca(e.target.value)
        }
        className="
          w-full
          mb-6
          rounded-xl
          border
          border-zinc-300
          px-4
          py-3
        "
      />

      <div className="space-y-4">

        {elenco.map((p) => {

          const lista = valutazioni.filter(
            (v) => String(v.paziente_id) === String(p.id)
          );

          return (

            <div
              key={p.id}
              className="
                bg-white
                rounded-xl
                border
                border-zinc-200
                shadow-sm
              "
            >

              <button
                onClick={() => toggle(p.id)}
                className="
                  w-full
                  flex
                  justify-between
                  items-center
                  px-5
                  py-4
                  text-left
                "
              >

                <div>

                  <div className="font-semibold text-lg">

                    📁 {p.nome} {p.cognome}

                  </div>

                  <div className="text-sm text-zinc-500">

                    {lista.length} valutazioni

                  </div>

                </div>

                <span className="text-xl">

                  {aperti[p.id] ? "▼" : "▶"}

                </span>

              </button>

              {aperti[p.id] && (

                <div className="border-t">

                  {lista.length === 0 && (

                    <div className="p-5 text-zinc-500">

                      Nessuna valutazione presente.

                    </div>

                  )}

                  {lista.map((v) => (

                    <div
                      key={v.id}
                      className="
                        flex
                        justify-between
                        items-center
                        px-5
                        py-4
                        border-b
                        last:border-b-0
                      "
                    >

                      <div>

                        <div className="font-semibold">

                          📄 Valutazione

                        </div>

                        <div className="text-sm text-zinc-500">

                          {new Date(
                            v.data_valutazione
                          ).toLocaleDateString("it-IT")}

                        </div>

                      </div>

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            navigate(
                              `/studio/valutazione?id=${v.id}&readonly=true`
                            )
                          }
                          className="
                            bg-zinc-800
                            hover:bg-zinc-700
                            text-white
                            px-3
                            py-2
                            rounded-lg
                          "
                        >
                          Apri
                        </button>

                        <button
                          onClick={() =>
                            navigate(
                              `/studio/valutazione?id=${v.id}`
                            )
                          }
                          className="
                            bg-yellow-500
                            hover:bg-yellow-400
                            text-black
                            px-3
                            py-2
                            rounded-lg
                            font-semibold
                          "
                        >
                          Modifica
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          );

        })}

      </div>

    </Layout>

  );

}