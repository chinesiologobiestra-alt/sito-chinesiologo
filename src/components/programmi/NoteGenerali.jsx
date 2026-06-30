export default function NoteGenerali({
  programma,
  setProgramma,
}) {

  return (

    <div className="bg-white rounded-xl border border-zinc-300 shadow-sm overflow-hidden">

      <div className="bg-zinc-900 px-5 py-3 border-b border-yellow-500">

        <h2 className="text-lg font-bold text-white">
          NOTE GENERALI
        </h2>

      </div>

      <div className="p-5">

        <textarea
          rows={6}
          value={programma.noteGenerali}
          onChange={(e) =>
            setProgramma({
              ...programma,
              noteGenerali: e.target.value,
            })
          }
          placeholder={`Esempio:

• Bere almeno 2 litri di acqua al giorno.

• Effettuare sempre 10 minuti di riscaldamento.

• Camminare almeno 8.000-10.000 passi.

• Stretching al termine dell'allenamento.

• Interrompere l'esercizio in caso di dolore.`}
          className="
            w-full
            rounded-xl
            border
            border-zinc-300
            px-4
            py-4
            resize-none
            leading-7
            focus:outline-none
            focus:ring-2
            focus:ring-yellow-400
          "
        />

      </div>

    </div>

  );

}