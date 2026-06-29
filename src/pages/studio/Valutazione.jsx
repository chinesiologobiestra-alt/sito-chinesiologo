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
import EsamePosturale from "../../components/valutazione/EsamePosturale";

import {
  salvaValutazione,
  getValutazione,
  updateValutazione,
} from "../../services/valutazioniService";

import { generaPDF } from "../../services/pdfService";

export default function Valutazione() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const pazienteId = searchParams.get("paziente");
  const valutazioneId = searchParams.get("id");
  console.log("pazienteId:", pazienteId);
console.log("valutazioneId:", valutazioneId);
  const readonly = searchParams.get("readonly") === "true";

  const [loading, setLoading] = useState(true);

  const [currentPazienteId, setCurrentPazienteId] =
    useState(null);

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

    posturale: {

  capoFront: "",
  spalleFront: "",
  clavicole: "",
  torace: "",
  bacinoFront: "",
  ginocchia: "",
  piedi: "",

  capoLat: "",
  spalleLat: "",
  cifosi: "",
  lordosi: "",
  bacinoLat: "",

  scapole: "",
  rachide: "",
  triangoli: "",
  achille: "",

  note: "",

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

    async function inizializza() {

      try {

        setLoading(true);

        if (pazienteId) {

          const { data, error } = await supabase
            .from("pazienti")
            .select("*")
            .eq("id", pazienteId)
            .single();

          if (!error) {

            setScheda((prev) => ({

              ...prev,

              anagrafica: {

                ...prev.anagrafica,

                nome: `${data.nome} ${data.cognome}`,

                telefono: data.telefono || "",

                email: data.email || "",

                dataNascita:
                  data.data_nascita || "",

              },

            }));

          }

        }

        if (valutazioneId) {

          const valutazione =
            await getValutazione(valutazioneId);

          setCurrentPazienteId(
            valutazione.paziente_id
          );

          setScheda(valutazione.dati);

        }

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    inizializza();

  }, [pazienteId, valutazioneId]);
    async function handleSalva() {

    try {

      /* ========================= */
      /* MODIFICA */
      /* ========================= */

      if (valutazioneId) {

        await updateValutazione(
          valutazioneId,
          scheda
        );

        alert("Valutazione aggiornata.");

        navigate(`/studio/pazienti/${currentPazienteId || pazienteId}`);

        return;

      }

      /* ========================= */
      /* NUOVA VALUTAZIONE */
      /* ========================= */

      await salvaValutazione(
        pazienteId,
        scheda
      );

      alert("Valutazione salvata.");

      navigate(`/studio/pazienti/${currentPazienteId || pazienteId}`);

    } catch (err) {

      console.error(err);

      alert(err.message);

    }

  }

  return (

    <Layout>

      <div className="max-w-[210mm] mx-auto mb-5 flex justify-between items-center">

        <button
          onClick={() =>
  navigate(
    `/studio/pazienti/${currentPazienteId || pazienteId}`
  )
}
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

          {!readonly && (

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

          )}
                    <button
            onClick={() =>
              generaPDF(
                `Valutazione_${
                  scheda.anagrafica.nome || "Paziente"
                }`
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

<Page>

  <SectionTitle title="8. ESAME POSTURALE STATICO" />

  <SectionBox>

    <EsamePosturale
      scheda={scheda}
      setScheda={setScheda}
    />

  </SectionBox>

</Page>
</Layout>

);

}