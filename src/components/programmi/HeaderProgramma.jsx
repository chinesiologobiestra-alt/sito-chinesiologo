export default function HeaderProgramma() {
  return (
    <div className="bg-white rounded-xl border border-zinc-300 overflow-hidden">

      <div className="bg-zinc-950 border-b-4 border-yellow-500 px-5 py-3">

        <div className="flex items-center justify-between gap-6">

          {/* Logo */}

          <div className="flex items-center gap-4 min-w-[240px]">

            <div className="w-20 flex items-center justify-center">

              <img
                src="/logo.png"
                alt="Fabio Biestra"
                className="h-16 object-contain"
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                Fabio Biestra
              </h2>

              <p className="text-yellow-500 tracking-[3px] uppercase text-xs">
                Chinesiologo
              </p>

            </div>

          </div>

          {/* Titolo */}

          <div className="flex-1 text-center">

            <h1 className="text-2xl font-black tracking-wide text-white">
              PROGRAMMA DI
              <br />
              ALLENAMENTO
            </h1>

            <p className="mt-1 text-xs uppercase tracking-[5px] text-zinc-300">
              Piano Personalizzato
            </p>

          </div>

          {/* Informazioni */}

          <div className="min-w-[150px] text-right text-xs text-white space-y-2">

            <div>
              <div className="font-semibold text-yellow-400">
                Paziente
              </div>

              <div>—</div>
            </div>

            <div>
              <div className="font-semibold text-yellow-400">
                Data
              </div>

              <div>—</div>
            </div>

            <div>
              <div className="font-semibold text-yellow-400">
                Durata
              </div>

              <div>—</div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}