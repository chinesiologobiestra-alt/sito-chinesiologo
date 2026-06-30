import TextField from "./TextField";
import TextAreaField from "./TextAreaField";

export default function Anamnesi({
  scheda,
  setScheda,
}) {

  const update = (campo, valore) => {
    setScheda({
      ...scheda,
      anamnesi: {
        ...scheda.anamnesi,
        [campo]: valore,
      },
    });
  };

  return (
    <div className="space-y-3">

      <TextField
        label="Motivo della visita"
        value={scheda.anamnesi.motivo}
        onChange={(e) => update("motivo", e.target.value)}
      />

      <TextField
        label="Obiettivi"
        value={scheda.anamnesi.obiettivi}
        onChange={(e) => update("obiettivi", e.target.value)}
      />

      <div className="grid grid-cols-2 gap-3">

        <TextField
          label="Attività fisica"
          value={scheda.anamnesi.attivita}
          onChange={(e) => update("attivita", e.target.value)}
        />

        <TextField
          label="Frequenza"
          value={scheda.anamnesi.frequenza}
          onChange={(e) => update("frequenza", e.target.value)}
        />

      </div>

      <div className="grid grid-cols-2 gap-3">

        <TextField
          label="Ore di sonno"
          value={scheda.anamnesi.sonno}
          onChange={(e) => update("sonno", e.target.value)}
        />

        <TextField
          label="Tipo di lavoro"
          value={scheda.anamnesi.lavoro}
          onChange={(e) => update("lavoro", e.target.value)}
        />

      </div>

      <TextAreaField
        label="Osservazioni"
        rows={4}
        value={scheda.anamnesi.osservazioni}
        onChange={(e) => update("osservazioni", e.target.value)}
      />

    </div>
  );
}