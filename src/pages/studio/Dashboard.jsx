import Layout from "../../components/studio/Layout";

export default function Dashboard() {
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
            0
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            Valutazioni
          </h2>

          <p className="text-4xl mt-4">
            0
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            Programmi
          </h2>

          <p className="text-4xl mt-4">
            0
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            Appuntamenti
          </h2>

          <p className="text-4xl mt-4">
            0
          </p>
        </div>

      </div>

    </Layout>
  );
}