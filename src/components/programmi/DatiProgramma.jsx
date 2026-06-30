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

    <div className="bg-white rounded-xl border border-zinc-300 shadow-sm overflow-hidden">

      <div className="bg-zinc-900 px-6 py-3 border-b border-yellow-500">

        <h2 className="text-lg font-bold text-white">
          DATI DEL PROGRAMMA
        </h2>

      </div>

      <div className="p-4">

        <div className="grid grid-cols-12 gap-6">

          {/* Nome Programma */}

          <div className="col-span-6">

            <label className="block text-sm font-semibold text-zinc-700 mb-2">
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
                rounded-xl
                border
                border-zinc-300
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-400
              "
            />

          </div>

          {/* Obiettivo */}

          <div className="col-span-4">

            <label className="block text-sm font-semibold text-zinc-700 mb-2">
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
                rounded-xl
                border
                border-zinc-300
                px-4
                py-3
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

            <label className="block text-sm font-semibold text-zinc-700 mb-2">
              Durata
            </label>

            <div className="flex items-center gap-2">

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
                  rounded-xl
                  border
                  border-zinc-300
                  px-3
                  py-3
                  text-center
                  focus:outline-none
                  focus:ring-2
                  focus:ring-yellow-400
                "
              />

              <span className="text-sm text-zinc-600">
                sett.
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}