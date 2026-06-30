import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import Layout from "../../components/studio/Layout";

export default function Dashboard() {

  const [stats, setStats] = useState({
    pazienti: 0,
    valutazioni: 0,
    programmi: 0,
    appuntamenti: 0,
  });

  useEffect(() => {

    async function caricaDashboard() {

      const [
        pazienti,
        valutazioni,
        programmi,
        appuntamenti,
      ] = await Promise.all([

        supabase
          .from("pazienti")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("valutazioni")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("programmi")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("appuntamenti")
          .select("*", { count: "exact", head: true }),

      ]);

      setStats({

        pazienti: pazienti.count || 0,

        valutazioni: valutazioni.count || 0,

        programmi: programmi.count || 0,

        appuntamenti: appuntamenti.count || 0,

      });

    }

    caricaDashboard();

  }, []);

  return (

    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            Pazienti
          </h2>

          <p className="text-4xl mt-4">
            {stats.pazienti}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            Valutazioni
          </h2>

          <p className="text-4xl mt-4">
            {stats.valutazioni}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            Programmi
          </h2>

          <p className="text-4xl mt-4">
            {stats.programmi}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            Appuntamenti
          </h2>

          <p className="text-4xl mt-4">
            {stats.appuntamenti}
          </p>
        </div>

      </div>

    </Layout>

  );

}