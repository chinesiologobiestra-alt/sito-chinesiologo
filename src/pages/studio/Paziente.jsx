import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../components/studio/Layout";
import { supabase } from "../../lib/supabase";

export default function Paziente() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [paziente, setPaziente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    caricaPaziente();
  }, []);

  async function caricaPaziente() {

    const { data, error } = await supabase
      .from("pazienti")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setPaziente(data);
    setLoading(false);

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

          <h2 className="text-2xl font-bold mb-6">

            Valutazioni

          </h2>

          <div className="text-zinc-500">

            Nessuna valutazione presente.

          </div>

          <button
            onClick={() =>
              navigate(`/studio/valutazione?paziente=${id}`)
            }
            className="mt-8 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold"
          >
            + Nuova Valutazione
          </button>

        </div>

      </div>

    </Layout>

  );

}