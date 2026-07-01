import HeaderProgramma from "./HeaderProgramma";
import DatiProgramma from "./DatiProgramma";
import NoteGenerali from "./NoteGenerali";
import PlannerSettimanale from "./PlannerSettimanale";

export default function DocumentoProgramma({
  programma,
  setProgramma,
  aggiornaProgramma,
  aggiornaGiorno,
}) {
  return (
    <div
      id="programma-pdf"
      className="
        bg-white
        rounded-xl
        shadow-md
        border
        border-zinc-300
        p-6
      "
    >
      {/* HEADER */}
      <HeaderProgramma />

      {/* DATI PROGRAMMA */}
      <div className="mt-5">
        <DatiProgramma
          programma={programma}
          setProgramma={setProgramma}
          aggiornaProgramma={aggiornaProgramma}
        />
      </div>

      {/* NOTE GENERALI */}
      <div className="mt-5">
        <NoteGenerali
          programma={programma}
          setProgramma={setProgramma}
          aggiornaProgramma={aggiornaProgramma}
        />
      </div>

      {/* PLANNER */}
      <div className="mt-6">
        <h2 className="text-lg font-bold text-zinc-800 border-b pb-2 mb-4">
          Programma Settimanale
        </h2>

        <PlannerSettimanale
          programma={programma}
          aggiornaGiorno={aggiornaGiorno}
        />
      </div>
    </div>
  );
}