export default function NoteGenerali({
  programma,
  setProgramma,
}) {
  return (

    <div className="bg-white rounded-xl border border-zinc-300 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="bg-zinc-900 border-b border-yellow-500 px-6 py-3">

        <h2 className="text-lg font-bold text-white">
          NOTE GENERALI
        </h2>

      </div>

      {/* Contenuto */}

      <div className="p-4">

        <p className="text-sm text-zinc-500 mb-4">
          Indicazioni valide per tutta la durata del programma.
        </p>

        <textarea
          rows={5}
          value={programma.noteGenerali}
          onChange={(e)=>
            setProgramma({
              ...programma,
              noteGenerali:e.target.value,
            })
          }
          placeholder={`Esempio:

• Bere almeno 2 litri di acqua al giorno

• Camminare almeno 8.000-10.000 passi

• Effettuare sempre il riscaldamento

• Stretching al termine dell'allenamento

• Interrompere l'esercizio in caso di dolore`}
          className="
            w-full
            rounded-xl
            border
            border-zinc-300
            px-5
            py-4
            resize-none
            leading-7
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