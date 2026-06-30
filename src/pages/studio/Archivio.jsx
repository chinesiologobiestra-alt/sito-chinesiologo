
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import Layout from "../../components/studio/Layout";

export default function Archivio() {

  const navigate = useNavigate();

  const [pazienti,setPazienti]=useState([]);
  const [valutazioni,setValutazioni]=useState([]);
  const [ricerca,setRicerca]=useState("");
  const [aperti,setAperti]=useState({});

  useEffect(()=>{
    async function carica(){

      const {data:p}=await supabase
        .from("pazienti")
        .select("id,nome,cognome")
        .order("cognome");

      const {data:v}=await supabase
        .from("valutazioni")
        .select("id,paziente_id,data");

      setPazienti(p || []);
      setValutazioni(v || []);
    }

    carica();
  },[]);

  const elenco=useMemo(()=>{
    return pazienti.filter(p=>{
      const nome=(p.nome+" "+p.cognome).toLowerCase();
      return nome.includes(ricerca.toLowerCase());
    });
  },[pazienti,ricerca]);

  function toggle(id){
    setAperti(prev=>({...prev,[id]:!prev[id]}));
  }

  return(
    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        Archivio
      </h1>

      <input
        placeholder="🔍 Cerca paziente..."
        value={ricerca}
        onChange={(e)=>setRicerca(e.target.value)}
        className="w-full mb-6 rounded-xl border border-zinc-300 px-4 py-3"
      />

      <div className="space-y-4">

        {elenco.map(p=>{

          const lista=valutazioni.filter(
            v=>v.paziente_id===p.id
          );

          return(

            <div
              key={p.id}
              className="bg-white rounded-xl border border-zinc-200 shadow-sm"
            >

              <button
                onClick={()=>toggle(p.id)}
                className="w-full flex justify-between items-center px-5 py-4 text-left"
              >

                <div>

                  <div className="font-semibold text-lg">
                    📁 {p.cognome} {p.nome}
                  </div>

                  <div className="text-sm text-zinc-500">
                    {lista.length} valutazioni
                  </div>

                </div>

                <span className="text-xl">
                  {aperti[p.id] ? "▼" : "▶"}
                </span>

              </button>

              {aperti[p.id] && (

                <div className="border-t">

                  {lista.length===0 && (
                    <div className="p-4 text-zinc-500">
                      Nessuna valutazione.
                    </div>
                  )}

                  {lista.map(v=>(

                    <div
                      key={v.id}
                      className="flex justify-between items-center px-5 py-3 border-b last:border-b-0"
                    >

                      <div>

                        <div className="font-medium">
                          📄 Valutazione
                        </div>

                        <div className="text-sm text-zinc-500">
                          {v.data}
                        </div>

                      </div>

                      <div className="flex gap-2">

                        <button
                          onClick={()=>navigate(`/studio/valutazione?id=${v.id}&readonly=true`)}
                          className="px-3 py-2 rounded bg-zinc-800 text-white"
                        >
                          Apri
                        </button>

                        <button
                          onClick={()=>navigate(`/studio/valutazione?id=${v.id}`)}
                          className="px-3 py-2 rounded bg-yellow-500"
                        >
                          Modifica
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          )

        })}

      </div>

    </Layout>
  );
}
