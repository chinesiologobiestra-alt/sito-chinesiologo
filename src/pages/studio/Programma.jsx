import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Layout from "../../components/studio/Layout";
import DocumentoProgramma from "../../components/programmi/DocumentoProgramma";
import ToolbarProgramma from "../../components/programmi/ToolbarProgramma";

import {
  salvaProgramma as creaProgramma,
  updateProgramma,
  getProgramma,
} from "../../services/programmaService";

export default function Programma() {
  const [searchParams] = useSearchParams();

  const pazienteId = searchParams.get("paziente");
  const programmaId = searchParams.get("id");
  const readonly = searchParams.get("readonly") === "true";

  const [programma, setProgramma] = useState({
    id: null,
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

  useEffect(() => {
    if (programmaId) caricaProgramma();
  }, [programmaId]);

  async function caricaProgramma() {
    try {
      const data = await getProgramma(programmaId);

      setProgramma({
        id: data.id,
        nome: data.nome ?? "",
        obiettivo: data.obiettivo ?? "",
        settimane: data.settimane ?? 4,
        noteGenerali: data.note_generali ?? "",
        giorni: data.giorni,
      });
    } catch (err) {
      console.error(err);
      alert("Errore durante il caricamento del programma.");
    }
  }

  function aggiornaProgramma(campo, valore) {
    if (readonly) return;

    setProgramma(prev => ({
      ...prev,
      [campo]: valore,
    }));
  }

  function aggiornaGiorno(giorno, dati) {
    if (readonly) return;

    setProgramma(prev => ({
      ...prev,
      giorni: {
        ...prev.giorni,
        [giorno]: dati,
      },
    }));
  }

  async function salva() {
    try {
      if (!pazienteId) {
        alert("Paziente non selezionato.");
        return;
      }

      if (programma.id) {
        const aggiornato = await updateProgramma(programma.id, programma);
        setProgramma(prev => ({ ...prev, id: aggiornato.id }));
      } else {
        const creato = await creaProgramma(pazienteId, programma);
        setProgramma(prev => ({ ...prev, id: creato.id }));
      }

      alert("Programma salvato con successo.");
    } catch (err) {
      console.error(err);
      alert("Errore durante il salvataggio.");
    }
  }

 async function esportaPDF() {
  try {
    const elemento = document.getElementById("programma-pdf");

    if (!elemento) {
      alert("Documento non trovato.");
      return;
    }

    const canvas = await html2canvas(elemento, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      windowWidth: elemento.scrollWidth,
      windowHeight: elemento.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      297,
      210
    );

    const nome =
      programma.nome?.trim() || "Programma";

    pdf.save(`${nome}.pdf`);

  } catch (err) {
    console.error(err);
    alert("Errore durante la creazione del PDF.");
  }
}
  return (
    <Layout>
      <div className="mx-auto w-full max-w-[1500px] p-6 space-y-6">

        <ToolbarProgramma
          onSalva={readonly ? undefined : salva}
          onPDF={esportaPDF}
        />

        <DocumentoProgramma
          programma={programma}
          setProgramma={setProgramma}
          aggiornaProgramma={aggiornaProgramma}
          aggiornaGiorno={aggiornaGiorno}
          readonly={readonly}
        />

      </div>
    </Layout>
  );
}
