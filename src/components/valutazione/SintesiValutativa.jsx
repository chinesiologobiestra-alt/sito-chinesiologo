import TextArea from "../ui/TextArea";

export default function SintesiValutativa({ scheda, setScheda }) {

  const sintesi = scheda.sintesi || {};

  function aggiorna(campo, valore) {
    setScheda({
      ...scheda,
      sintesi: {
        ...sintesi,
        [campo]: valore,
      },
    });
  }

  return (
    <div className="space-y-4">

      <TextArea
        label="Alterazioni principali"
        rows={4}
        value={sintesi.alterazioni || ""}
        onChange={(e)=>aggiorna("alterazioni", e.target.value)}
      />

      <TextArea
        label="Punti di forza"
        rows={3}
        value={sintesi.puntiForza || ""}
        onChange={(e)=>aggiorna("puntiForza", e.target.value)}
      />

      <TextArea
        label="Priorità di intervento"
        rows={4}
        value={sintesi.priorita || ""}
        onChange={(e)=>aggiorna("priorita", e.target.value)}
      />

      <TextArea
        label="Considerazioni finali"
        rows={5}
        value={sintesi.conclusioni || ""}
        onChange={(e)=>aggiorna("conclusioni", e.target.value)}
      />

    </div>
  );
}
