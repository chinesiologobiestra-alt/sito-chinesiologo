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

    <div className="bg-white rounded-xl border border-zinc-300 shadow-sm p-6">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Nome programma */}

        <div>

          <label className="block text-sm font-semibold text-zinc-700 mb-2">
            Nome Programma
          </label>

          <input
            value={programma.nome}
            onChange={(e) =>
              setProgramma({
                ...programma,
                nome: e.target.value,
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

        <div>

          <label className="block text-sm font-semibold text-zinc-700 mb-2">
            Obiettivo
          </label>

          <select
            value={programma.obiettivo}
            onChange={(e) =>
              setProgramma({
                ...programma,
                obiettivo: e.target.value,
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

            {obiettivi.map((o) => (

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

        <div>

          <label className="block text-sm font-semibold text-zinc-700 mb-2">
            Durata
          </label>

          <div className="flex items-center gap-3">

            <input
              type="number"
              min={1}
              max={52}
              value={programma.settimane}
              onChange={(e) =>
                setProgramma({
                  ...programma,
                  settimane: e.target.value,
                })
              }
              className="
                w-28
                rounded-xl
                border
                border-zinc-300
                px-4
                py-3
                text-center
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-400
              "
            />

            <span className="text-zinc-600 font-medium">
              settimane
            </span>

          </div>

        </div>

      </div>

    </div>

  );

}