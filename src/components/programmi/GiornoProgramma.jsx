export default function GiornoProgramma({
  giorno,
  valore,
  onChange,
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

    <div className="border-r border-zinc-300 bg-white flex flex-col h-full">

      {/* Intestazione giorno */}

      <div className="bg-zinc-900 text-white text-center py-3 border-b-2 border-yellow-500">

        <h2 className="font-bold tracking-wide uppercase text-sm">
          {giorno}
        </h2>

      </div>

      {/* Gruppo muscolare */}

      <div className="p-3 border-b border-zinc-300">

        <label className="block text-[11px] font-semibold uppercase text-zinc-500 mb-2">
          Gruppo
        </label>

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
            text-xs
            rounded-md
            border
            border-zinc-300
            px-2
            py-2
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-yellow-400
          "
        >

          <option value="">-</option>

          {gruppi.map((g) => (
            g && (
              <option key={g} value={g}>
                {g}
              </option>
            )
          ))}

        </select>

      </div>

      {/* Note */}

      <div className="flex-1 p-3 flex flex-col">

        <label className="block text-[11px] font-semibold uppercase text-zinc-500 mb-2">
          Note
        </label>

        <textarea
          value={valore?.note || ""}
          onChange={(e) =>
            onChange({
              ...valore,
              note: e.target.value,
            })
          }
          placeholder="Indicazioni..."
          className="
            flex-1
            w-full
            resize-none
            border-0
            bg-transparent
            text-sm
            leading-7
            focus:outline-none
          "
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent 31px, #e4e4e7 32px)",
            backgroundSize: "100% 32px",
          }}
        />

      </div>

    </div>

  );
}
