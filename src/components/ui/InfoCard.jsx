export default function InfoCard({

  titolo,
  valore,
  descrizione,
  colore = "yellow",

}) {

  const colori = {

    yellow: {
      bordo: "border-yellow-500",
      titolo: "text-yellow-600",
    },

    green: {
      bordo: "border-green-500",
      titolo: "text-green-600",
    },

    orange: {
      bordo: "border-orange-500",
      titolo: "text-orange-600",
    },

    red: {
      bordo: "border-red-500",
      titolo: "text-red-600",
    },

    blue: {
      bordo: "border-blue-500",
      titolo: "text-blue-600",
    },

  };

  const c = colori[colore] || colori.yellow;

  return (

    <div
      className={`
        bg-white
        rounded-2xl
        border-2
        ${c.bordo}
        shadow-sm
        p-5
      `}
    >

      <div className={`text-sm font-semibold ${c.titolo}`}>

        {titolo}

      </div>

      <div className="text-3xl font-bold mt-2">

        {valore || "--"}

      </div>

      <div className="text-sm text-zinc-500 mt-2 leading-5">

        {descrizione || ""}

      </div>

    </div>

  );

}