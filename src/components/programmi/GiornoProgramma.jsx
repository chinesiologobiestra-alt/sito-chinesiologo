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
        ${!ultimaColonna ? "border-r border-zinc-300" : ""}
      `}
    >
      {/* GIORNO */}

      <div className="bg-zinc-900 text-white text-center py-1 border-b border-yellow-500">

        <h2 className="font-bold uppercase tracking-wide text-[10px]">
          {giorno}
        </h2>

      </div>

      {/* GRUPPO */}

      <div className="p-1 border-b border-zinc-300">

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
            h-8
            rounded
            border
            border-zinc-300
            bg-white
            px-2
            text-[10px]
            leading-none
            appearance-none
            focus:outline-none
          "
        >
          <option value="">-</option>

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

      <div className="flex-1 p-1">

        <textarea
          value={valore?.note || ""}
          onChange={(e) =>
            onChange({
              ...valore,
              note: e.target.value,
            })
          }
          placeholder="Serie - Rip. - Recupero"
          className="
            w-full
            h-full
            resize-none
            border-0
            bg-transparent
            text-[10px]
            leading-4
            focus:outline-none
          "
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent 15px, #e4e4e7 16px)",
            backgroundSize: "100% 16px",
          }}
        />

      </div>

    </div>
  );
}