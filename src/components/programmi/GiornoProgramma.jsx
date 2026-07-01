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

      <div className="bg-zinc-900 text-white text-center py-1.5 border-b border-yellow-500">

        <h2 className="font-bold uppercase tracking-wide text-[11px]">
          {giorno}
        </h2>

      </div>

      {/* GRUPPO */}

      <div className="p-1.5 border-b border-zinc-300">

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
            rounded
            border
            border-zinc-300
            bg-white
            px-1.5
            py-1
            text-[11px]
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

      <div className="flex-1 p-1.5">

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
            text-[11px]
            leading-5
            focus:outline-none
          "
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent 19px, #e4e4e7 20px)",
            backgroundSize: "100% 20px",
          }}
        />

      </div>

    </div>
  );
}