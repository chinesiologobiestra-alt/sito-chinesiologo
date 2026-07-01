export default function ToolbarProgramma({
  onSalva,
  onPDF,
  readonly = false,
}) {
  return (
    <div className="flex justify-end gap-3 mb-6">
      {!readonly && (
        <button
          type="button"
          onClick={onSalva}
          className="
            bg-zinc-900
            hover:bg-black
            text-white
            font-semibold
            px-6
            py-3
            rounded-xl
            shadow
            transition
          "
        >
          💾 Salva
        </button>
      )}

      <button
        type="button"
        onClick={onPDF}
        className="
          bg-yellow-500
          hover:bg-yellow-400
          text-black
          font-semibold
          px-6
          py-3
          rounded-xl
          shadow
          transition
        "
      >
        📄 Esporta PDF
      </button>
    </div>
  );
}
