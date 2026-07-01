import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "../../components/studio/Layout";
import { supabase } from "../../lib/supabase";

import {
  getValutazioniPaziente,
  eliminaValutazione,
} from "../../services/valutazioniService";

import {
  getProgrammiPaziente,
  eliminaProgramma,
} from "../../services/programmaService";

export default function Paziente() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [paziente, setPaziente] = useState(null);
  const [valutazioni, setValutazioni] = useState([]);
  const [programmi, setProgrammi] = useState([]);
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

      const listaProgrammi = await getProgrammiPaziente(id);
      setProgrammi(listaProgrammi || []);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleElimina(idValutazione) {
    if (!window.confirm("Eliminare definitivamente questa valutazione?")) return;

    try {
      await eliminaValutazione(idValutazione);
      setValutazioni(prev => prev.filter(v => v.id !== idValutazione));
      alert("Valutazione eliminata.");
    } catch (err) {
      console.error(err);
      alert("Errore durante l'eliminazione.");
    }
  }

  async function handleEliminaProgramma(idProgramma) {
    if (!window.confirm("Eliminare definitivamente questo programma?")) return;

    try {
      await eliminaProgramma(idProgramma);
      setProgrammi(prev => prev.filter(p => p.id !== idProgramma));
      alert("Programma eliminato.");
    } catch (err) {
      console.error(err);
      alert("Errore durante l'eliminazione.");
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-20">Caricamento...</div>
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
            <div><p className="text-zinc-500 mb-1">Telefono</p><p className="font-semibold">{paziente.telefono || "-"}</p></div>
            <div><p className="text-zinc-500 mb-1">Email</p><p className="font-semibold">{paziente.email || "-"}</p></div>
            <div><p className="text-zinc-500 mb-1">Data di nascita</p><p className="font-semibold">{paziente.data_nascita || "-"}</p></div>
          </div>
        </div>

        {/* BLOCCO VALUTAZIONI */}
        <div className="bg-white rounded-2xl shadow p-8">
          {/* Mantieni qui il blocco delle valutazioni già presente nel tuo file senza modifiche */}
        </div>

        {/* BLOCCO PROGRAMMI */}
        <div className="bg-white rounded-2xl shadow p-8">

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Programmi di Allenamento</h2>

            <button
              onClick={() => navigate(`/studio/programma?paziente=${id}`)}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold"
            >
              + Nuovo Programma
            </button>
          </div>

          {programmi.length === 0 ? (
            <div className="text-center py-10 text-zinc-500">
              Nessun programma presente.
            </div>
          ) : (
            <div className="space-y-4">
              {programmi.map((p) => (
                <div key={p.id} className="border rounded-xl p-5 flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{p.nome || "Programma"}</div>
                    <div className="text-sm text-zinc-500">
                      {new Date(p.created_at).toLocaleDateString("it-IT")}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/studio/programma?id=${p.id}&paziente=${id}&readonly=true`)}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    >👁 Apri</button>

                    <button
                      onClick={() => navigate(`/studio/programma?id=${p.id}&paziente=${id}`)}
                      className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-semibold"
                    >✏ Modifica</button>

                    <button
                      onClick={() => handleEliminaProgramma(p.id)}
                      className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    >🗑 Elimina</button>
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
