import GiornoProgramma from "./GiornoProgramma";

const GIORNI = [
  ["lunedi", "Lunedì"],
  ["martedi", "Martedì"],
  ["mercoledi", "Mercoledì"],
  ["giovedi", "Giovedì"],
  ["venerdi", "Venerdì"],
  ["sabato", "Sabato"],
  ["domenica", "Domenica"],
];

export default function PlannerSettimanale({
  programma,
  aggiornaGiorno,
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-300 bg-white">

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(7, 1fr)",
        }}
      >
        {GIORNI.map(([key, label], index) => (
          <GiornoProgramma
            key={key}
            giorno={label}
            valore={programma.giorni[key]}
            onChange={(value) => aggiornaGiorno(key, value)}
            ultimaColonna={index === GIORNI.length - 1}
          />
        ))}
      </div>

    </div>
  );
}