export default function NoteGenerali({
  programma,
  setProgramma,
}) {
  return (

    <div className="bg-white border border-zinc-300 rounded-xl overflow-hidden">

      {/* Header */}

      <div className="bg-zinc-900 border-b border-yellow-500 px-4 py-2">

        <h2 className="text-sm font-bold text-white tracking-wide">
          NOTE GENERALI
        </h2>

      </div>

      {/* Contenuto */}

      <div className="p-3">

        <p className="text-[11px] text-zinc-500 mb-2">
          Indicazioni valide per tutta la durata del programma.
        </p>

        <textarea
          rows={2}
          value={programma.noteGenerali}
          onChange={(e)=>
            setProgramma({
              ...programma,
              noteGenerali:e.target.value,
            })
          }
          placeholder={`Esempio:

• Bere almeno 2 litri di acqua al giorno
• Camminare 8.000-10.000 passi
• Riscaldamento prima dell'allenamento
• Stretching finale`}
          className="
            w-full
            rounded-lg
            border
            border-zinc-300
            px-3
            py-2
            resize-none
            text-sm
            leading-5
            text-zinc-700
            focus:outline-none
            focus:ring-2
            focus:ring-yellow-400
          "
        />

      </div>

    </div>

  );

}