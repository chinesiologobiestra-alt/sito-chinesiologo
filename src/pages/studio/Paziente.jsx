import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "../../components/studio/Layout";
import { supabase } from "../../lib/supabase";

import {
  getValutazioniPaziente,
  eliminaValutazione,
} from "../../services/valutazioniService";

export default function Paziente() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [paziente, setPaziente] = useState(null);
  const [valutazioni, setValutazioni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    caricaPaziente();
  }, [id]);

  async function caricaPaziente() {

    try {

      setLoading(true);

      const { data, error } = await supabase
        .from("pazienti")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setPaziente(data);

      const lista = await getValutazioniPaziente(id);

      setValutazioni(lista || []);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  async function handleElimina(idValutazione) {

    const conferma = window.confirm(
      "Eliminare definitivamente questa valutazione?"
    );

    if (!conferma) return;

    try {

      await eliminaValutazione(idValutazione);

      setValutazioni((prev) =>
        prev.filter((v) => v.id !== idValutazione)
      );

      alert("Valutazione eliminata.");

    } catch (err) {

      console.error(err);

      alert("Errore durante l'eliminazione.");

    }

  }

  if (loading) {

    return (

      <Layout>

        <div className="text-center py-20">

          Caricamento...

        </div>

      </Layout>

    );

  }

  return (

    <Layout>

      <div className="max-w-5xl mx-auto space-y-8">

        <button
          onClick={() => navigate("/studio/pazienti")}
          className="text-yellow-500 hover:underline"
        >
          ← Torna ai pazienti
        </button>

        <div className="bg-white rounded-2xl shadow p-8">

          <h1 className="text-4xl font-bold mb-8">

            {paziente.nome} {paziente.cognome}

          </h1>

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <p className="text-zinc-500 mb-1">

                Telefono

              </p>

              <p className="font-semibold">

                {paziente.telefono || "-"}

              </p>

            </div>

            <div>

              <p className="text-zinc-500 mb-1">

                Email

              </p>

              <p className="font-semibold">

                {paziente.email || "-"}

              </p>

            </div>

            <div>

              <p className="text-zinc-500 mb-1">

                Data di nascita

              </p>

              <p className="font-semibold">

                {paziente.data_nascita || "-"}

              </p>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow p-8">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-2xl font-bold">

              Storico Valutazioni

            </h2>

            <button
              onClick={() =>
                navigate(`/studio/valutazione?paziente=${id}`)
              }
              className="
                bg-yellow-500
                hover:bg-yellow-400
                text-black
                px-6
                py-3
                rounded-xl
                font-semibold
              "
            >
              + Nuova Valutazione
            </button>

          </div>

          {valutazioni.length === 0 ? (

            <div className="text-center py-10 text-zinc-500">

              Nessuna valutazione presente.

            </div>

          ) : (

            <div className="space-y-4">

              {valutazioni.map((v) => (

                <div
                  key={v.id}
                  className="
                    border
                    rounded-xl
                    p-5
                    flex
                    justify-between
                    items-center
                  "
                >

                  <div>

                    <div className="font-semibold">

                      {new Date(
                        v.data_valutazione
                      ).toLocaleDateString("it-IT")}

                    </div>

                    <div className="text-sm text-zinc-500">

                      Valutazione clinica

                    </div>

                  </div>

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        navigate(
                          `/studio/valutazione?id=${v.id}&paziente=${id}&readonly=true`
                        )
                      }
                      className="
                        bg-blue-600
                        hover:bg-blue-500
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        text-sm
                        font-semibold
                      "
                    >
                      👁 Apri
                    </button>

                    <button
                      onClick={() =>
                        navigate(
                          `/studio/valutazione?id=${v.id}&paziente=${id}`
                        )
                      }
                      className="
                        bg-yellow-500
                        hover:bg-yellow-400
                        text-black
                        px-4
                        py-2
                        rounded-lg
                        text-sm
                        font-semibold
                      "
                    >
                      ✏ Modifica
                    </button>

                    <button
                      onClick={() => handleElimina(v.id)}
                      className="
                        bg-red-600
                        hover:bg-red-500
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        text-sm
                        font-semibold
                      "
                    >
                      🗑 Elimina
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </Layout>

  );

}