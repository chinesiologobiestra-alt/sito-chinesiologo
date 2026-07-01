import { useState } from "react";

import Layout from "../../components/studio/Layout";
import DocumentoProgramma from "../../components/programmi/DocumentoProgramma";
import ToolbarProgramma from "../../components/programmi/ToolbarProgramma";

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

  // ==========================
  // Aggiornamento dati generali
  // ==========================
  function aggiornaProgramma(campo, valore) {
    setProgramma((prev) => ({
      ...prev,
      [campo]: valore,
    }));
  }

  // ==========================
  // Aggiornamento singolo giorno
  // ==========================
  function aggiornaGiorno(giorno, dati) {
    setProgramma((prev) => ({
      ...prev,
      giorni: {
        ...prev.giorni,
        [giorno]: dati,
      },
    }));
  }

  // ==========================
  // Salvataggio (da implementare)
  // ==========================
  async function salvaProgramma() {
    console.log("Salvataggio Programma");

    console.log(programma);

    // TODO:
    // Salvataggio su Supabase
  }

  // ==========================
  // PDF (da implementare)
  // ==========================
  async function esportaPDF() {
    console.log("Esporta PDF");

    // TODO:
    // html2canvas + jsPDF
  }

  return (
    <Layout>

      <div className="mx-auto w-full max-w-[1500px] p-6 space-y-6">

        <ToolbarProgramma
          onSalva={salvaProgramma}
          onPDF={esportaPDF}
        />

        <DocumentoProgramma
          programma={programma}
          setProgramma={setProgramma}
          aggiornaProgramma={aggiornaProgramma}
          aggiornaGiorno={aggiornaGiorno}
        />

      </div>

    </Layout>
  );
}