import { useState } from "react";

import Layout from "../../components/studio/Layout";

import HeaderProgramma from "../../components/programmi/HeaderProgramma";
import DatiProgramma from "../../components/programmi/DatiProgramma";
import GiornoProgramma from "../../components/programmi/GiornoProgramma";

export default function Programma() {

  const [programma, setProgramma] = useState({

    nome: "",

    obiettivo: "",

    settimane: 4,

    giorni: {

      lunedi: {
        gruppo: "",
        note: "",
      },

      martedi: {
        gruppo: "",
        note: "",
      },

      mercoledi: {
        gruppo: "",
        note: "",
      },

      giovedi: {
        gruppo: "",
        note: "",
      },

      venerdi: {
        gruppo: "",
        note: "",
      },

      sabato: {
        gruppo: "",
        note: "",
      },

      domenica: {
        gruppo: "",
        note: "",
      },

    },

  });

  function aggiornaGiorno(giorno, dati) {

    setProgramma({

      ...programma,

      giorni: {

        ...programma.giorni,

        [giorno]: dati,

      },

    });

  }

  return (

    <Layout>

      <div className="max-w-5xl mx-auto space-y-6">

        <HeaderProgramma />

        <DatiProgramma
          programma={programma}
          setProgramma={setProgramma}
        />

        <GiornoProgramma
          giorno="Lunedì"
          valore={programma.giorni.lunedi}
          onChange={(v) =>
            aggiornaGiorno("lunedi", v)
          }
        />

        <GiornoProgramma
          giorno="Martedì"
          valore={programma.giorni.martedi}
          onChange={(v) =>
            aggiornaGiorno("martedi", v)
          }
        />

        <GiornoProgramma
          giorno="Mercoledì"
          valore={programma.giorni.mercoledi}
          onChange={(v) =>
            aggiornaGiorno("mercoledi", v)
          }
        />

        <GiornoProgramma
          giorno="Giovedì"
          valore={programma.giorni.giovedi}
          onChange={(v) =>
            aggiornaGiorno("giovedi", v)
          }
        />

        <GiornoProgramma
          giorno="Venerdì"
          valore={programma.giorni.venerdi}
          onChange={(v) =>
            aggiornaGiorno("venerdi", v)
          }
        />

        <GiornoProgramma
          giorno="Sabato"
          valore={programma.giorni.sabato}
          onChange={(v) =>
            aggiornaGiorno("sabato", v)
          }
        />

        <GiornoProgramma
          giorno="Domenica"
          valore={programma.giorni.domenica}
          onChange={(v) =>
            aggiornaGiorno("domenica", v)
          }
        />

      </div>

    </Layout>

  );

}