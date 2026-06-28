import InputNumber from "../ui/InputNumber";

export default function ParametriVitali({
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

    <div className="space-y-8">

      <h3 className="text-xl font-bold">
        Parametri Vitali
      </h3>

      <div className="grid grid-cols-2 gap-5">

        <InputNumber
          label="Pressione Sistolica"
          suffix="mmHg"
          value={dati.pressioneSistolica}
          onChange={(e)=>
            aggiorna("pressioneSistolica",e.target.value)
          }
        />

        <InputNumber
          label="Pressione Diastolica"
          suffix="mmHg"
          value={dati.pressioneDiastolica}
          onChange={(e)=>
            aggiorna("pressioneDiastolica",e.target.value)
          }
        />

        <InputNumber
          label="Frequenza Cardiaca"
          suffix="bpm"
          value={dati.frequenzaCardiaca}
          onChange={(e)=>
            aggiorna("frequenzaCardiaca",e.target.value)
          }
        />

        <InputNumber
          label="Saturazione"
          suffix="%"
          value={dati.saturazione}
          onChange={(e)=>
            aggiorna("saturazione",e.target.value)
          }
        />

        <InputNumber
          label="Temperatura"
          suffix="°C"
          value={dati.temperatura}
          onChange={(e)=>
            aggiorna("temperatura",e.target.value)
          }
        />

        <InputNumber
          label="Frequenza Respiratoria"
          suffix="atti/min"
          value={dati.frequenzaRespiratoria}
          onChange={(e)=>
            aggiorna("frequenzaRespiratoria",e.target.value)
          }
        />

        <InputNumber
          label="Glicemia"
          suffix="mg/dL"
          value={dati.glicemia}
          onChange={(e)=>
            aggiorna("glicemia",e.target.value)
          }
        />

      </div>

    </div>

  );

}