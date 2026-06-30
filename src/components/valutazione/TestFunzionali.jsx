import RadioGroup from "../ui/RadioGroup";
import TextArea from "../ui/TextArea";

export default function TestFunzionali({ scheda, setScheda }) {

  const test = scheda.testFunzionali || {};

  function aggiorna(campo,valore){
    setScheda({
      ...scheda,
      testFunzionali:{
        ...test,
        [campo]:valore,
      }
    });
  }

  const esito=["Normale","Alterato","Doloroso","N.E."];

  const gruppi=[
    {
      titolo:"Equilibrio",
      campi:[
        ["Romberg","romberg"],
        ["Monopodalica DX","monoDx"],
        ["Monopodalica SX","monoSx"],
      ]
    },
    {
      titolo:"Mobilità",
      campi:[
        ["Sit & Reach","sitReach"],
        ["Thomas","thomas"],
        ["Ober","ober"],
        ["Straight Leg Raise","slr"],
      ]
    },
    {
      titolo:"Funzionali",
      campi:[
        ["Squat","squat"],
        ["Overhead Squat","ohSquat"],
        ["Step Down","stepDown"],
      ]
    },
    {
      titolo:"Core",
      campi:[
        ["Plank","plank"],
        ["Side Plank DX","sideDx"],
        ["Side Plank SX","sideSx"],
      ]
    }
  ];

  return(
    <div className="space-y-4">

      {gruppi.map(g=>(
        <div key={g.titolo} className="border border-zinc-300 rounded-lg overflow-hidden">

          <div className="bg-black text-yellow-500 font-semibold px-3 py-2">
            {g.titolo}
          </div>

          <div className="p-3 space-y-3">

            {g.campi.map(([label,key])=>(
              <div key={key} className="grid grid-cols-[170px_1fr] gap-4 items-start">

                <div className="text-sm font-medium text-zinc-700 pt-1">
                  {label}
                </div>

                <RadioGroup
                  label=""
                  value={test[key]||""}
                  onChange={(v)=>aggiorna(key,v)}
                  options={esito}
                />

              </div>
            ))}

          </div>

        </div>
      ))}

      <TextArea
        label="Osservazioni test funzionali"
        rows={4}
        value={test.note||""}
        onChange={(e)=>aggiorna("note",e.target.value)}
      />

    </div>
  );
}
