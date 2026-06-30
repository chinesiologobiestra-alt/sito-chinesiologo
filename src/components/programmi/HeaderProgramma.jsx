export default function HeaderProgramma() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-zinc-300 overflow-hidden">

      {/* Header */}

      <div className="bg-zinc-950 border-b-4 border-yellow-500 px-8 py-6">

        <div className="flex items-center justify-between gap-8">

          {/* Logo */}

          <div className="flex items-center gap-5 min-w-[280px]">

            <div className="w-24 flex items-center justify-center">

              <img
                src="/logo.png"
                alt="Fabio Biestra"
                className="h-24 object-contain"
              />

            </div>

            <div>

              <h2 className="text-3xl font-bold text-white">
                Fabio Biestra
              </h2>

              <p className="text-yellow-500 tracking-[4px] uppercase text-sm">
                Chinesiologo
              </p>

            </div>

          </div>

          {/* Titolo */}

          <div className="flex-1 text-center">

            <h1 className="text-4xl font-black tracking-wide text-white">
              PROGRAMMA DI ALLENAMENTO
            </h1>

            <p className="mt-2 text-sm uppercase tracking-[6px] text-zinc-300">
              Piano Personalizzato
            </p>

          </div>

          {/* Informazioni */}

          <div className="min-w-[220px] text-right text-sm text-white space-y-3">

            <div>
              <div className="font-semibold text-yellow-400">
                Paziente
              </div>

              <div className="font-medium">
                —
              </div>
            </div>

            <div>
              <div className="font-semibold text-yellow-400">
                Data
              </div>

              <div className="font-medium">
                —
              </div>
            </div>

            <div>
              <div className="font-semibold text-yellow-400">
                Durata
              </div>

              <div className="font-medium">
                —
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}