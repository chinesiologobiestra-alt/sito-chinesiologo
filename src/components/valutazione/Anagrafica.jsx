import TextField from "./TextField";

export default function Anagrafica({
  scheda,
  setScheda,
}) {
  return (
    <div className="border border-zinc-300 rounded-md p-5 bg-white space-y-5">

      {/* Riga 1 */}
      <div className="flex gap-5 items-end">

        <TextField
          className="flex-1"
          label="Nome e Cognome"
          value={scheda.nome}
          onChange={(e) =>
            setScheda({
              ...scheda,
              nome: e.target.value,
            })
          }
        />

        <TextField
          className="w-44"
          label="Data"
          value={scheda.data}
          onChange={(e) =>
            setScheda({
              ...scheda,
              data: e.target.value,
            })
          }
        />

      </div>

      {/* Riga 2 */}

      <div className="flex gap-5 items-end">

        <TextField
          className="flex-1"
          label="Luogo di nascita"
          value={scheda.luogoNascita}
          onChange={(e) =>
            setScheda({
              ...scheda,
              luogoNascita: e.target.value,
            })
          }
        />

        <TextField
          className="w-56"
          label="Data di nascita"
          value={scheda.dataNascita}
          onChange={(e) =>
            setScheda({
              ...scheda,
              dataNascita: e.target.value,
            })
          }
        />

      </div>

      {/* Riga 3 */}

      <div className="flex gap-5 items-end">

        <TextField
          className="w-20"
          label="Età"
          value={scheda.eta}
          onChange={(e) =>
            setScheda({
              ...scheda,
              eta: e.target.value,
            })
          }
        />

        <div className="w-36">

          <label className="block text-[11px] font-semibold uppercase text-zinc-700 mb-1">
            Sesso
          </label>

          <div className="flex gap-6 h-7 items-center">

            <label className="flex items-center gap-2 text-sm cursor-pointer">

              <input
                type="radio"
                name="sesso"
                value="M"
                checked={scheda.sesso === "M"}
                onChange={(e) =>
                  setScheda({
                    ...scheda,
                    sesso: e.target.value,
                  })
                }
              />

              M

            </label>

            <label className="flex items-center gap-2 text-sm cursor-pointer">

              <input
                type="radio"
                name="sesso"
                value="F"
                checked={scheda.sesso === "F"}
                onChange={(e) =>
                  setScheda({
                    ...scheda,
                    sesso: e.target.value,
                  })
                }
              />

              F

            </label>

          </div>

        </div>

        <TextField
          className="flex-1"
          label="Telefono"
          value={scheda.telefono}
          onChange={(e) =>
            setScheda({
              ...scheda,
              telefono: e.target.value,
            })
          }
        />

      </div>

      {/* Riga 4 */}

      <TextField
        label="Indirizzo"
        value={scheda.indirizzo}
        onChange={(e) =>
          setScheda({
            ...scheda,
            indirizzo: e.target.value,
          })
        }
      />

      {/* Riga 5 */}

      <div className="flex gap-5 items-end">

        <TextField
          className="flex-1"
          label="Professione"
          value={scheda.professione}
          onChange={(e) =>
            setScheda({
              ...scheda,
              professione: e.target.value,
            })
          }
        />

        <TextField
          className="flex-1"
          label="E-mail"
          value={scheda.email}
          onChange={(e) =>
            setScheda({
              ...scheda,
              email: e.target.value,
            })
          }
        />

      </div>

    </div>
  );
}