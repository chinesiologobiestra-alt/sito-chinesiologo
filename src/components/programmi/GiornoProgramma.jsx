export default function GiornoProgramma({
  giorno,
  valore,
  onChange,
  ultimaColonna = false,
}) {
  const gruppi = [
    "",
    "Riposo",
    "Petto",
    "Schiena",
    "Gambe",
    "Spalle",
    "Braccia",
    "Addome",
    "Petto - Tricipiti",
    "Schiena - Bicipiti",
    "Spalle - Addome",
    "Upper Body",
    "Lower Body",
    "Push",
    "Pull",
    "Legs",
    "Push / Pull",
    "Total Body",
    "Cardio",
    "Camminata",
    "Mobilità",
    "Stretching",
  ];

  return (
    <div
      className={`
        bg-white
        flex
        flex-col
        h-full
        ${!ultimaColonna ? "border-r border-zinc-300" : ""}
      `}
    >
      {/* GIORNO */}

      <div className="bg-zinc-900 text-white text-center py-2 border-b-2 border-yellow-500">
        <h2 className="font-bold uppercase tracking-wide text-xs">
          {giorno}
        </h2>
      </div>

      {/* GRUPPO MUSCOLARE */}

      <div className="p-2 border-b border-zinc-300">
        <select
          value={valore?.gruppo || ""}
          onChange={(e) =>
            onChange({
              ...valore,
              gruppo: e.target.value,
            })
          }
          className="
            w-full
            rounded-md
            border
            border-zinc-300
            bg-white
            px-2
            py-1.5
            text-xs
            focus:outline-none
            focus:ring-2
            focus:ring-yellow-400
          "
        >
          <option value="">Seleziona...</option>

          {gruppi.map(
            (g) =>
              g && (
                <option key={g} value={g}>
                  {g}
                </option>
              )
          )}
        </select>
      </div>

      {/* NOTE */}

      <div className="flex-1 p-2">
        <textarea
          value={valore?.note || ""}
          onChange={(e) =>
            onChange({
              ...valore,
              note: e.target.value,
            })
          }
          placeholder="Esercizi, serie, ripetizioni..."
          className="
            w-full
            h-full
            resize-none
            border-0
            bg-transparent
            text-xs
            leading-6
            focus:outline-none
          "
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent 23px, #e4e4e7 24px)",
            backgroundSize: "100% 24px",
          }}
        />
      </div>
    </div>
  );
}