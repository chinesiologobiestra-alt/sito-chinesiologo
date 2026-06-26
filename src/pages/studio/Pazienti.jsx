import { useEffect, useState } from "react";
import Layout from "../../components/studio/Layout";
import NuovoPazienteModal from "../../components/studio/NuovoPazienteModal";

import {
  creaPaziente,
  getPazienti,
} from "../../services/pazientiService";

export default function Pazienti() {
  const [showModal, setShowModal] = useState(false);

  const [pazienti, setPazienti] = useState([]);

  const [loading, setLoading] = useState(true);

  const [ricerca, setRicerca] = useState("");

  async function caricaPazienti() {
    try {
      setLoading(true);

      const lista = await getPazienti();

      setPazienti(lista || []);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    caricaPazienti();
  }, []);

  const pazientiFiltrati = pazienti.filter((p) => {
    const testo =
      `${p.nome} ${p.cognome}`.toLowerCase();

    return testo.includes(ricerca.toLowerCase());
  });

  return (
    <Layout>
      <div className="space-y-6">

        {/* HEADER */}

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold">
              Pazienti
            </h1>

            <p className="text-zinc-500 mt-1">
              Gestisci l'anagrafica dei tuoi pazienti.
            </p>

          </div>

          <button
            onClick={() => setShowModal(true)}
            className="
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              px-5
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            + Nuovo Paziente
          </button>

        </div>

        {/* RICERCA */}

        <input
          type="text"
          placeholder="🔍 Cerca paziente..."
          value={ricerca}
          onChange={(e) => setRicerca(e.target.value)}
          className="
            w-full
            border
            border-zinc-300
            rounded-xl
            px-4
            py-3
            outline-none
            focus:border-yellow-500
          "
        />

        {/* LISTA */}

        <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">

          {loading ? (

            <div className="p-10 text-center">

              Caricamento...

            </div>

          ) : pazientiFiltrati.length === 0 ? (

            <div className="p-10 text-center text-zinc-500">

              <div className="text-5xl mb-4">
                👤
              </div>

              <h2 className="text-xl font-semibold mb-2">
                Nessun paziente presente
              </h2>

              <p>
                Premi <strong>Nuovo Paziente</strong> per iniziare.
              </p>

            </div>

          ) : (

            pazientiFiltrati.map((p) => (

              <div
                key={p.id}
                className="
                  flex
                  justify-between
                  items-center
                  px-6
                  py-5
                  border-b
                  hover:bg-zinc-50
                  cursor-pointer
                  transition
                "
              >

                <div>

                  <div className="font-semibold text-lg">

                    {p.nome} {p.cognome}

                  </div>

                  <div className="text-sm text-zinc-500">

                    {p.telefono}

                  </div>

                </div>

                <div className="text-2xl text-zinc-400">

                  →

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      <NuovoPazienteModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={async (paziente) => {
          try {

            await creaPaziente(paziente);

            await caricaPazienti();

            setShowModal(false);

          } catch (err) {

            console.error(err);

            alert(err.message);

          }
        }}
      />

    </Layout>
  );
}