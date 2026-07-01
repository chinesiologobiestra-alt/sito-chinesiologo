import HeaderProgramma from "./HeaderProgramma";
import DatiProgramma from "./DatiProgramma";
import NoteGenerali from "./NoteGenerali";
import PlannerSettimanale from "./PlannerSettimanale";

export default function DocumentoProgramma({
  programma,
  setProgramma,
  aggiornaProgramma,
  aggiornaGiorno,
  readonly = false,
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
        <HeaderProgramma programma={programma} />

        <div className="mt-4">
          <DatiProgramma
            programma={programma}
            setProgramma={setProgramma}
            aggiornaProgramma={aggiornaProgramma}
            readonly={readonly}
          />
        </div>

        <div className="mt-5">
          <NoteGenerali
            programma={programma}
            setProgramma={setProgramma}
            aggiornaProgramma={aggiornaProgramma}
            readonly={readonly}
          />
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold text-zinc-800 border-b pb-2 mb-4">
            Programma Settimanale
          </h2>

          <PlannerSettimanale
            programma={programma}
            aggiornaGiorno={aggiornaGiorno}
            readonly={readonly}
          />
        </div>
      </div>
    </div>
  );
}
