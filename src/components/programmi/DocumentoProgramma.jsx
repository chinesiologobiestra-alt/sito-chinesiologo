import ProgrammaPage from "./ProgrammaPage";

import HeaderProgramma from "./HeaderProgramma";
import DatiProgramma from "./DatiProgramma";
import NoteGenerali from "./NoteGenerali";
import PlannerSettimanale from "./PlannerSettimanale";

export default function DocumentoProgramma({
  programma,
  pazienteId,
  programmaId,
  setProgramma,
  aggiornaProgramma,
  aggiornaGiorno,
  readonly = false,
}) {
  return (
    <ProgrammaPage>

      {/* HEADER */}

      <HeaderProgramma
        pazienteId={pazienteId}
        programma={programma}
      />

      {/* DATI PROGRAMMA */}

      <div className="mt-5">

        <DatiProgramma
          programma={programma}
          setProgramma={setProgramma}
          aggiornaProgramma={aggiornaProgramma}
          readonly={readonly}
        />

      </div>

      {/* NOTE GENERALI */}

      <div className="mt-5">

        <NoteGenerali
          programma={programma}
          setProgramma={setProgramma}
          aggiornaProgramma={aggiornaProgramma}
          readonly={readonly}
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
          readonly={readonly}
        />

      </div>

    </ProgrammaPage>
  );
}