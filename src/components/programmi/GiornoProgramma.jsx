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

    <div
      className="
        bg-white
        border
        border-zinc-300
        rounded-xl
        shadow-sm
        overflow-hidden
        h-full
      "
    >

      <div className="bg-zinc-900 border-b border-yellow-500 py-2">

        <h2 className="text-center font-bold text-white">

          {giorno.toUpperCase()}

        </h2>

      </div>

      <div className="p-3 space-y-3">

        <div>

          <label className="block text-xs font-semibold text-zinc-600 mb-1">

            Gruppo

          </label>

          <select
            value={valore.gruppo}
            onChange={(e)=>
              onChange({
                ...valore,
                gruppo:e.target.value,
              })
            }
            className="
              w-full
              rounded-lg
              border
              border-zinc-300
              px-2
              py-2
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-yellow-400
            "
          >

            {gruppi.map((g)=>(

              <option
                key={g}
                value={g}
              >

                {g || "Seleziona..."}

              </option>

            ))}

          </select>

        </div>

        <div>

          <label className="block text-xs font-semibold text-zinc-600 mb-1">

            Note

          </label>

          <textarea
            rows={10}
            value={valore.note}
            onChange={(e)=>
              onChange({
                ...valore,
                note:e.target.value,
              })
            }
            className="
              w-full
              rounded-lg
              border
              border-zinc-300
              px-2
              py-2
              text-sm
              resize-none
              focus:outline-none
              focus:ring-2
              focus:ring-yellow-400
            "
          />

        </div>

      </div>

    </div>

  );

}