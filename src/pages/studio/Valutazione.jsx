import { useState } from "react";

import Layout from "../../components/studio/Layout";
import Page from "../../components/valutazione/Page";
import Header from "../../components/valutazione/Header";
import SectionTitle from "../../components/valutazione/SectionTitle";
import SectionBox from "../../components/valutazione/SectionBox";

import Anagrafica from "../../components/valutazione/Anagrafica";
import Anamnesi from "../../components/valutazione/Anamnesi";
import AnamnesiPatologica from "../../components/valutazione/AnamnesiPatologica";
import BodyMap from "../../components/valutazione/BodyMap";
import VAS from "../../components/valutazione/VAS";

export default function Valutazione() {

  const [scheda, setScheda] = useState({

    anagrafica: {
      nome: "",
      data: "",
      luogoNascita: "",
      dataNascita: "",
      eta: "",
      sesso: "",
      telefono: "",
      indirizzo: "",
      professione: "",
      email: "",
    },

    anamnesi: {
      motivo: "",
      obiettivi: "",
      attivita: "",
      frequenza: "",
      sonno: "",
      lavoro: "",
      osservazioni: "",
    },

    patologica: {

      patologie: [],

      sintomi: [],

      interventi: "",

      traumi: "",

      farmaci: "",

      allergie: "",

    },

    dolore: {
      vas: 0,
    },

  });

  return (
    <Layout>

      <Page>

        <Header />

        {/* ========================= */}
        {/* 1. DATI ANAGRAFICI */}
        {/* ========================= */}

        <SectionTitle title="1. DATI ANAGRAFICI" />

        <SectionBox>

          <Anagrafica
            scheda={scheda}
            setScheda={setScheda}
          />

        </SectionBox>

        {/* ========================= */}
        {/* 2. ANAMNESI GENERALE */}
        {/* ========================= */}

        <SectionTitle title="2. ANAMNESI GENERALE" />

        <SectionBox>

          <Anamnesi
            scheda={scheda}
            setScheda={setScheda}
          />

        </SectionBox>

        {/* ========================= */}
        {/* 3. ANAMNESI PATOLOGICA */}
        {/* ========================= */}

        <SectionTitle title="3. ANAMNESI PATOLOGICA" />

        <div className="grid grid-cols-3 gap-4">

          <div className="col-span-2">

            <SectionBox>

              <AnamnesiPatologica
                scheda={scheda}
                setScheda={setScheda}
              />

            </SectionBox>

          </div>

          <div className="space-y-4">

            <SectionBox>

              <BodyMap
                scheda={scheda}
                setScheda={setScheda}
              />

            </SectionBox>

            <SectionTitle title="4. VALUTAZIONE DEL DOLORE" />

            <SectionBox>

              <VAS
                scheda={scheda}
                setScheda={setScheda}
              />

            </SectionBox>

          </div>

        </div>

      </Page>

    </Layout>
  );
}