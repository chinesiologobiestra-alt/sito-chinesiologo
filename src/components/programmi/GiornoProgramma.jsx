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

    <div className="bg-white border border-zinc-300 rounded-xl p-5 space-y-4">

      <h2 className="text-xl font-bold text-yellow-600">
        {giorno}
      </h2>

      <div>

        <label className="block text-sm font-semibold mb-2">
          Gruppo muscolare
        </label>

        <select
          value={valore.gruppo}
          onChange={(e)=>
            onChange({
              ...valore,
              gruppo:e.target.value,
            })
          }
          className="w-full border rounded-lg px-3 py-2"
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

        <label className="block text-sm font-semibold mb-2">
          Note
        </label>

        <textarea
          rows={4}
          value={valore.note}
          onChange={(e)=>
            onChange({
              ...valore,
              note:e.target.value,
            })
          }
          className="
            w-full
            border
            rounded-lg
            px-3
            py-2
            resize-none
          "
        />

      </div>

    </div>

  );

}