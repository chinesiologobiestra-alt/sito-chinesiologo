export default function DatiProgramma({
  programma,
  setProgramma,
}) {

  const obiettivi = [
    "Dimagrimento",
    "Ricomposizione corporea",
    "Ipertrofia",
    "Tonificazione",
    "Benessere",
    "Preparazione atletica",
  ];

  return (

    <div className="bg-white border border-zinc-300 rounded-xl p-5 space-y-5">

      <div>

        <label className="block text-sm font-semibold mb-2">
          Nome Programma
        </label>

        <input
          value={programma.nome}
          onChange={(e)=>
            setProgramma({
              ...programma,
              nome:e.target.value,
            })
          }
          className="w-full border rounded-lg px-3 py-2"
        />

      </div>

      <div>

        <label className="block text-sm font-semibold mb-2">
          Obiettivo
        </label>

        <select
          value={programma.obiettivo}
          onChange={(e)=>
            setProgramma({
              ...programma,
              obiettivo:e.target.value,
            })
          }
          className="w-full border rounded-lg px-3 py-2"
        >

          <option value="">
            Seleziona...
          </option>

          {obiettivi.map((o)=>(
            <option key={o}>
              {o}
            </option>
          ))}

        </select>

      </div>

      <div>

        <label className="block text-sm font-semibold mb-2">
          Durata
        </label>

        <div className="flex items-center gap-3">

          <input
            type="number"
            min={1}
            max={52}
            value={programma.settimane}
            onChange={(e)=>
              setProgramma({
                ...programma,
                settimane:e.target.value,
              })
            }
            className="w-24 border rounded-lg px-3 py-2"
          />

          <span className="text-zinc-500">
            settimane
          </span>

        </div>

      </div>

    </div>

  );

}