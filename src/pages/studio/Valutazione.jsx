import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

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
import Antropometria from "../../components/valutazione/Antropometria";
import ParametriVitali from "../../components/valutazione/ParametriVitali";
import OsservazioneGenerale from "../../components/valutazione/OsservazioneGenerale";

import { salvaValutazione } from "../../services/valutazioniService";

import { generaPDF } from "../../services/pdfService";

export default function Valutazione() {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const pazienteId = searchParams.get("paziente");

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

esameObiettivo: {

  altezza: "",
  peso: "",
  bmi: "",

  vita: "",
  fianchi: "",
  whr: "",

  torace: "",

  braccioDx: "",
  braccioSx: "",

  avambraccioDx: "",
  avambraccioSx: "",

  cosciaDx: "",
  cosciaSx: "",

  polpaccioDx: "",
  polpaccioSx: "",

  pressioneSistolica: "",
pressioneDiastolica: "",

frequenzaCardiaca: "",

saturazione: "",

temperatura: "",

frequenzaRespiratoria: "",

glicemia: "",

  respirazione: "",

  appoggio: "",

  equilibrio: "",

  note: "",

  dominanza: "",

deambulazione: "",

lavoro: "",

attivitaFisica: "",

ausili: [],

},

  });

  useEffect(() => {

    if (!pazienteId) return;

    async function caricaPaziente() {

      const { data, error } = await supabase
        .from("pazienti")
        .select("*")
        .eq("id", pazienteId)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setScheda((prev) => ({

        ...prev,

        anagrafica: {

          ...prev.anagrafica,

          nome: `${data.nome} ${data.cognome}`,
          telefono: data.telefono || "",
          email: data.email || "",
          dataNascita: data.data_nascita || "",

        },

      }));

    }

    caricaPaziente();

  }, [pazienteId]);

  async function handleSalva() {

    try {

      await salvaValutazione(
        pazienteId,
        scheda
      );

      alert("Valutazione salvata correttamente!");

      navigate(`/studio/pazienti/${pazienteId}`);

    } catch (err) {

      console.error(err);

      alert(err.message);

    }

  }

  return (

    <Layout>

      <div className="max-w-[210mm] mx-auto mb-5 flex justify-between items-center">

  <button
    onClick={() => navigate(`/studio/pazienti/${pazienteId}`)}
    className="
      bg-zinc-800
      hover:bg-zinc-700
      text-white
      px-5
      py-3
      rounded-xl
    "
  >
    ← Torna al paziente
  </button>

  <div className="flex gap-3">

    <button
      onClick={handleSalva}
      className="
        bg-yellow-500
        hover:bg-yellow-400
        text-black
        font-bold
        px-6
        py-3
        rounded-xl
      "
    >
      💾 Salva Valutazione
    </button>

    <button
      onClick={() =>
        generaPDF(
          `Valutazione_${scheda.anagrafica.nome || "Paziente"}`
        )
      }
      className="
        bg-red-600
        hover:bg-red-500
        text-white
        font-bold
        px-6
        py-3
        rounded-xl
      "
    >
      📄 Esporta PDF
    </button>

  </div>

</div>

<Page>

        <Header />

        <SectionTitle title="1. DATI ANAGRAFICI" />

        <SectionBox>

          <Anagrafica
            scheda={scheda}
            setScheda={setScheda}
          />

        </SectionBox>

        <SectionTitle title="2. ANAMNESI GENERALE" />

        <SectionBox>

          <Anamnesi
            scheda={scheda}
            setScheda={setScheda}
          />

        </SectionBox>

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

            ...
            <SectionBox>

              <VAS
                scheda={scheda}
                setScheda={setScheda}
              />

            </SectionBox>

          </div>

        </div>

      </Page>

      {/* ========================= */}
      {/* PAGINA 2 */}
      {/* ========================= */}

      <Page>

        <SectionTitle title="5. ESAME OBIETTIVO" />

        <SectionBox>

          <Antropometria
            scheda={scheda}
            setScheda={setScheda}
          />

        </SectionBox>

        <SectionTitle title="6. PARAMETRI VITALI" />

<SectionBox>

  <ParametriVitali
    scheda={scheda}
    setScheda={setScheda}
  />

</SectionBox>

<SectionTitle title="7. OSSERVAZIONE GENERALE" />

<SectionBox>

  <OsservazioneGenerale
    scheda={scheda}
    setScheda={setScheda}
  />

</SectionBox>

      </Page>

    </Layout>

  );

}