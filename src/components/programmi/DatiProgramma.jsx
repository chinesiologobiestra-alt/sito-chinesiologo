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

    <div className="bg-white border border-zinc-300 rounded-xl overflow-hidden">

      <div className="bg-zinc-900 px-5 py-2 border-b border-yellow-500">

        <h2 className="text-base font-bold text-white">
          DATI DEL PROGRAMMA
        </h2>

      </div>

      <div className="p-3">

        <div className="grid grid-cols-12 gap-4">

          {/* Nome */}

          <div className="col-span-5">

            <label className="block text-xs font-semibold text-zinc-700 mb-1">
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
              placeholder="Es. Programma Dimagrimento"
              className="
                w-full
                rounded-lg
                border
                border-zinc-300
                px-3
                py-2
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-400
              "
            />

          </div>

          {/* Obiettivo */}

          <div className="col-span-5">

            <label className="block text-xs font-semibold text-zinc-700 mb-1">
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
              className="
                w-full
                rounded-lg
                border
                border-zinc-300
                px-3
                py-2
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-400
              "
            >

              <option value="">
                Seleziona...
              </option>

              {obiettivi.map((o)=>(
                <option
                  key={o}
                  value={o}
                >
                  {o}
                </option>
              ))}

            </select>

          </div>

          {/* Durata */}

          <div className="col-span-2">

            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Durata
            </label>

            <div className="flex items-center gap-1">

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
                className="
                  w-full
                  rounded-lg
                  border
                  border-zinc-300
                  px-2
                  py-2
                  text-sm
                  text-center
                  focus:outline-none
                  focus:ring-2
                  focus:ring-yellow-400
                "
              />

              <span className="text-xs text-zinc-600">
                sett.
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}