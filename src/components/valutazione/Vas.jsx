export default function VAS({
  scheda,
  setScheda,
}) {

  const value = scheda.dolore.vas;

  return (

    <div className="space-y-4">

      <div className="flex justify-between items-center">

        <div>

          <h4 className="text-[11px] font-semibold uppercase text-zinc-700">
            Scala VAS
          </h4>

          <p className="text-[11px] text-zinc-500">
            0 = Nessun dolore • 10 = Peggior dolore immaginabile
          </p>

        </div>

        <div className="text-3xl font-bold text-yellow-600">
          {value}
        </div>

      </div>

      <input
        type="range"
        min="0"
        max="10"
        step="1"
        value={value}
        onChange={(e)=>
          setScheda({
            ...scheda,
            dolore:{
              ...scheda.dolore,
              vas:Number(e.target.value)
            }
          })
        }
        className="w-full accent-yellow-500"
      />

      <div className="relative">

        <div className="h-4 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500"></div>

        <div className="flex justify-between text-[11px] mt-2 text-zinc-600">

          {[0,1,2,3,4,5,6,7,8,9,10].map((n)=>(

            <span key={n}>{n}</span>

          ))}

        </div>

      </div>

    </div>

  );

}