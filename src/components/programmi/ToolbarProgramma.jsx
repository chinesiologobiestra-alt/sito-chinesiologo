export default function ToolbarProgramma({
  onSalva,
  onPDF,
}) {
  return (
    <div className="flex items-center justify-between">

      {/* Titolo */}

      <div>
        <h1 className="text-2xl font-bold text-zinc-800">
          Programma di Allenamento
        </h1>

        <p className="text-sm text-zinc-500 mt-1">
          Crea, modifica e stampa il programma personalizzato del paziente.
        </p>
      </div>

      {/* Pulsanti */}

      <div className="flex gap-3">

        <button
          onClick={onSalva}
          className="
            flex
            items-center
            gap-2
            rounded-lg
            bg-zinc-900
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-zinc-800
          "
        >
          💾 Salva
        </button>

        <button
          onClick={onPDF}
          className="
            flex
            items-center
            gap-2
            rounded-lg
            bg-yellow-500
            px-5
            py-2.5
            text-sm
            font-semibold
            text-black
            transition
            hover:bg-yellow-400
          "
        >
          📄 Esporta PDF
        </button>

      </div>

    </div>
  );
}