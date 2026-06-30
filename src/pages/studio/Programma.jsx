import { useState } from "react";

import Layout from "../../components/studio/Layout";
import HeaderProgramma from "../../components/programmi/HeaderProgramma";
import DatiProgramma from "../../components/programmi/DatiProgramma";
import NoteGenerali from "../../components/programmi/NoteGenerali";
import GiornoProgramma from "../../components/programmi/GiornoProgramma";

export default function Programma() {
  const [programma, setProgramma] = useState({
    nome: "",
    obiettivo: "",
    settimane: 4,
    noteGenerali: "",
    giorni: {
      lunedi: { gruppo: "", note: "" },
      martedi: { gruppo: "", note: "" },
      mercoledi: { gruppo: "", note: "" },
      giovedi: { gruppo: "", note: "" },
      venerdi: { gruppo: "", note: "" },
      sabato: { gruppo: "", note: "" },
      domenica: { gruppo: "", note: "" },
    },
  });

  function aggiornaGiorno(giorno, dati) {
    setProgramma(prev => ({
      ...prev,
      giorni: {
        ...prev.giorni,
        [giorno]: dati,
      },
    }));
  }

  const giorni = [
    ["lunedi","Lunedì"],
    ["martedi","Martedì"],
    ["mercoledi","Mercoledì"],
    ["giovedi","Giovedì"],
    ["venerdi","Venerdì"],
    ["sabato","Sabato"],
    ["domenica","Domenica"],
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-[1800px] p-6 space-y-6">
        <HeaderProgramma />

        <div className="bg-white border border-zinc-300 rounded-xl shadow-sm p-6 space-y-6">

          <DatiProgramma programma={programma} setProgramma={setProgramma} />

          <NoteGenerali programma={programma} setProgramma={setProgramma} />

          <div>
            <h2 className="text-xl font-bold text-zinc-800 mb-4">
              Pianificazione Settimanale
            </h2>

            <div className="overflow-x-auto">
              <div
                className="grid gap-0 border border-zinc-300 min-w-[1700px]"
                style={{ gridTemplateColumns: "repeat(7,minmax(240px,1fr))" }}
              >
                {giorni.map(([key,label]) => (
                  <GiornoProgramma
                    key={key}
                    giorno={label}
                    valore={programma.giorni[key]}
                    onChange={(v)=>aggiornaGiorno(key,v)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <button className="px-6 py-3 rounded-xl bg-zinc-800 text-white">
              💾 Salva
            </button>

            <button className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-semibold">
              📄 Esporta PDF
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
}
