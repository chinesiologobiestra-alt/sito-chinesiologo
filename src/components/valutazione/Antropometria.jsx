import InputNumber from "../ui/InputNumber";
import InfoCard from "../ui/InfoCard";

import {
  calcolaBMI,
  classificaBMI,
  calcolaWHR,
  classificaWHR,
  pesoIdeale,
  differenzaPeso,
} from "../../utils/calcoliAntropometrici";

export default function Antropometria({
  scheda,
  setScheda,
}) {

  const dati = scheda.esameObiettivo;

  const sesso = scheda.anagrafica.sesso;

  function aggiorna(campo, valore) {

    setScheda({

      ...scheda,

      esameObiettivo: {

        ...scheda.esameObiettivo,

        [campo]: valore,

      },

    });

  }

  const bmi = calcolaBMI(
    dati.altezza,
    dati.peso
  );

  const bmiClasse = classificaBMI(bmi);

  const whr = calcolaWHR(
    dati.vita,
    dati.fianchi
  );

  const whrClasse = classificaWHR(
    whr,
    sesso
  );

  const ideale = pesoIdeale(
    dati.altezza,
    sesso
  );

  const differenza = differenzaPeso(
    dati.peso,
    ideale
  );

  function osservazioni() {

    const lista = [];

    if (parseFloat(bmi) >= 25)
      lista.push("BMI superiore ai valori di riferimento.");

    if (parseFloat(bmi) >= 30)
      lista.push("Obesità. Valutare composizione corporea.");

    if (parseFloat(whr) >= 1 && sesso !== "F")
      lista.push("Distribuzione addominale del grasso.");

    if (parseFloat(whr) >= 0.85 && sesso === "F")
      lista.push("Distribuzione addominale del grasso.");

    if (!lista.length)
      lista.push("Nessuna osservazione automatica.");

    return lista;

  }

  return (

    <div className="grid grid-cols-12 gap-8">

      {/* -------------------------- */}
      {/* COLONNA SINISTRA           */}
      {/* -------------------------- */}

      <div className="col-span-8 space-y-8">
              {/* ============================= */}
        {/* MISURE PRINCIPALI */}
        {/* ============================= */}

        <div>

          <h3 className="text-xl font-bold mb-5">
            Misure principali
          </h3>

          <div className="grid grid-cols-2 gap-5">

            <InputNumber
              label="Altezza"
              suffix="cm"
              value={dati.altezza}
              onChange={(e) =>
                aggiorna("altezza", e.target.value)
              }
            />

            <InputNumber
              label="Peso"
              suffix="kg"
              value={dati.peso}
              onChange={(e) =>
                aggiorna("peso", e.target.value)
              }
            />

            <InputNumber
              label="Circonferenza Vita"
              suffix="cm"
              value={dati.vita}
              onChange={(e) =>
                aggiorna("vita", e.target.value)
              }
            />

            <InputNumber
              label="Circonferenza Fianchi"
              suffix="cm"
              value={dati.fianchi}
              onChange={(e) =>
                aggiorna("fianchi", e.target.value)
              }
            />

          </div>

        </div>

        {/* ============================= */}
        {/* CIRCONFERENZE */}
        {/* ============================= */}

        <div>

          <h3 className="text-xl font-bold mb-5">
            Circonferenze
          </h3>

          <div className="grid grid-cols-2 gap-5">

            <InputNumber
              label="Torace"
              suffix="cm"
              value={dati.torace}
              onChange={(e) =>
                aggiorna("torace", e.target.value)
              }
            />

            <InputNumber
              label="Braccio DX"
              suffix="cm"
              value={dati.braccioDx}
              onChange={(e) =>
                aggiorna("braccioDx", e.target.value)
              }
            />

            <InputNumber
              label="Braccio SX"
              suffix="cm"
              value={dati.braccioSx}
              onChange={(e) =>
                aggiorna("braccioSx", e.target.value)
              }
            />

            <InputNumber
              label="Avambraccio DX"
              suffix="cm"
              value={dati.avambraccioDx}
              onChange={(e) =>
                aggiorna("avambraccioDx", e.target.value)
              }
            />

            <InputNumber
              label="Avambraccio SX"
              suffix="cm"
              value={dati.avambraccioSx}
              onChange={(e) =>
                aggiorna("avambraccioSx", e.target.value)
              }
            />

            <InputNumber
              label="Coscia DX"
              suffix="cm"
              value={dati.cosciaDx}
              onChange={(e) =>
                aggiorna("cosciaDx", e.target.value)
              }
            />

            <InputNumber
              label="Coscia SX"
              suffix="cm"
              value={dati.cosciaSx}
              onChange={(e) =>
                aggiorna("cosciaSx", e.target.value)
              }
            />

            <InputNumber
              label="Polpaccio DX"
              suffix="cm"
              value={dati.polpaccioDx}
              onChange={(e) =>
                aggiorna("polpaccioDx", e.target.value)
              }
            />

            <InputNumber
              label="Polpaccio SX"
              suffix="cm"
              value={dati.polpaccioSx}
              onChange={(e) =>
                aggiorna("polpaccioSx", e.target.value)
              }
            />

          </div>

        </div>

      </div>

      {/* ============================= */}
      {/* COLONNA DESTRA */}
      {/* ============================= */}

      <div className="col-span-4 space-y-5">

                <InfoCard
          titolo="BMI"
          valore={bmi || "--"}
          descrizione={bmiClasse || "Inserisci altezza e peso"}
          colore={
            parseFloat(bmi) >= 30
              ? "red"
              : parseFloat(bmi) >= 25
              ? "orange"
              : "green"
          }
        />

        <InfoCard
          titolo="WHR"
          valore={whr || "--"}
          descrizione={whrClasse || "Inserisci vita e fianchi"}
          colore={
            whrClasse === "Alto rischio"
              ? "red"
              : whrClasse === "Rischio aumentato"
              ? "orange"
              : "green"
          }
        />

        <InfoCard
          titolo="Peso ideale"
          valore={
            ideale
              ? `${ideale} kg`
              : "--"
          }
          descrizione="Formula di Lorentz"
          colore="blue"
        />

        <InfoCard
          titolo="Differenza peso"
          valore={
            differenza
              ? `${differenza > 0 ? "+" : ""}${differenza} kg`
              : "--"
          }
          descrizione={
            differenza > 0
              ? "Peso superiore al teorico"
              : differenza < 0
              ? "Peso inferiore al teorico"
              : ""
          }
          colore={
            differenza > 10
              ? "orange"
              : "green"
          }
        />

        <div className="bg-zinc-50 border rounded-2xl p-5">

          <h3 className="font-bold text-lg mb-4">
            🤖 Assistente Clinico
          </h3>

          <div className="space-y-3 text-sm text-zinc-700">

            {osservazioni().map((item, index) => (

              <div
                key={index}
                className="flex gap-2"
              >

                <span className="text-yellow-500">
                  ●
                </span>

                <span>
                  {item}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}
      