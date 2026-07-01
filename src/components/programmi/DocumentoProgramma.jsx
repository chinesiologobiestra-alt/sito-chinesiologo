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
    <div className="flex justify-center">

      <div
        id="programma-pdf"
        className="
          bg-white
          shadow-xl
          border
          border-zinc-300
          rounded-xl

          w-[297mm]
          min-h-[210mm]

          p-[10mm]

          overflow-hidden
        "
      >

        <HeaderProgramma />

        <div className="mt-4">

          <DatiProgramma
            programma={programma}
            setProgramma={setProgramma}
            aggiornaProgramma={aggiornaProgramma}
          />

        </div>

        <div className="mt-4">

          <NoteGenerali
            programma={programma}
            setProgramma={setProgramma}
            aggiornaProgramma={aggiornaProgramma}
          />

        </div>

        <div className="mt-5">

          <h2 className="text-lg font-bold border-b pb-2 mb-3">

            Programma Settimanale

          </h2>

          <PlannerSettimanale
            programma={programma}
            aggiornaGiorno={aggiornaGiorno}
          />

        </div>

      </div>

    </div>
  );
}