import RadioGroup from "../ui/RadioGroup";
import CheckGroup from "../ui/CheckGroup";
import TextArea from "../ui/TextArea";

export default function OsservazioneGenerale({
  scheda,
  setScheda,
}) {

  const dati = scheda.esameObiettivo;

  function aggiorna(campo, valore) {

    setScheda({

      ...scheda,

      esameObiettivo: {

        ...dati,

        [campo]: valore,

      },

    });

  }

  return (

    <div className="space-y-4">

      <h3 className="text-lg font-bold">
        Osservazione Generale
      </h3>

      <RadioGroup
        label="Dominanza"
        value={dati.dominanza || ""}
        onChange={(v)=>aggiorna("dominanza",v)}
        options={[
          "Destrimane",
          "Mancino",
          "Ambidestro",
        ]}
      />

      <RadioGroup
        label="Respirazione"
        value={dati.respirazione || ""}
        onChange={(v)=>aggiorna("respirazione",v)}
        options={[
          "Diaframmatica",
          "Toracica",
          "Mista",
        ]}
      />

      <RadioGroup
        label="Appoggio"
        value={dati.appoggio || ""}
        onChange={(v)=>aggiorna("appoggio",v)}
        options={[
          "Simmetrico",
          "Asimmetrico",
        ]}
      />

      <RadioGroup
        label="Equilibrio"
        value={dati.equilibrio || ""}
        onChange={(v)=>aggiorna("equilibrio",v)}
        options={[
          "Buono",
          "Discreto",
          "Scarso",
        ]}
      />

      <RadioGroup
        label="Deambulazione"
        value={dati.deambulazione || ""}
        onChange={(v)=>aggiorna("deambulazione",v)}
        options={[
          "Normale",
          "Antalgica",
          "Con ausili",
          "Altro",
        ]}
      />

      <RadioGroup
        label="Attività lavorativa"
        value={dati.lavoro || ""}
        onChange={(v)=>aggiorna("lavoro",v)}
        options={[
          "Sedentaria",
          "In piedi",
          "Movimentazione carichi",
          "Mista",
        ]}
      />

      <RadioGroup
        label="Attività fisica"
        value={dati.attivitaFisica || ""}
        onChange={(v)=>aggiorna("attivitaFisica",v)}
        options={[
          "Assente",
          "Saltuaria",
          "Regolare",
          "Agonistica",
        ]}
      />

      <CheckGroup
        label="Ausili"
        values={dati.ausili || []}
        onChange={(v)=>aggiorna("ausili",v)}
        options={[
          "Plantari",
          "Tutore",
          "Bastone",
          "Stampelle",
          "Carrozzina",
        ]}
      />

      <TextArea
        label="Osservazioni"
        rows={4}
        value={dati.note || ""}
        onChange={(e)=>aggiorna("note",e.target.value)}
      />

    </div>

  );

}