
import TextArea from "../ui/TextArea";

function ROMRow({ label, norm, dx, sx, onDx, onSx }) {
  return (
    <tr className="border-b last:border-b-0">
      <td className="py-2 pr-3 text-sm font-medium text-zinc-700">{label}</td>
      <td className="py-1 px-2">
        <input
          type="number"
          value={dx}
          onChange={onDx}
          className="w-full h-8 rounded border border-zinc-300 px-2 text-sm text-center"
        />
      </td>
      <td className="py-1 px-2">
        <input
          type="number"
          value={sx}
          onChange={onSx}
          className="w-full h-8 rounded border border-zinc-300 px-2 text-sm text-center"
        />
      </td>
      <td className="py-2 text-xs text-zinc-500 text-center">{norm}</td>
    </tr>
  );
}

export default function ROMArticolare({ scheda, setScheda }) {

  const rom = scheda.rom || {};

  function aggiorna(campo,valore){
    setScheda({
      ...scheda,
      rom:{
        ...rom,
        [campo]:valore,
      }
    });
  }

  const sezioni=[
    {
      titolo:"Rachide cervicale",
      righe:[
        ["Flessione","cervFl","50°"],
        ["Estensione","cervEst","60°"],
        ["Rotazione","cervRot","80°"],
        ["Inclinazione","cervInc","45°"],
      ]
    },
    {
      titolo:"Spalla",
      righe:[
        ["Flessione","spFl","180°"],
        ["Abduzione","spAb","180°"],
        ["Rot. Interna","spRI","70°"],
        ["Rot. Esterna","spRE","90°"],
      ]
    },
    {
      titolo:"Anca",
      righe:[
        ["Flessione","anFl","120°"],
        ["Estensione","anEst","20°"],
        ["Abduzione","anAb","45°"],
        ["Rot. Interna","anRI","40°"],
        ["Rot. Esterna","anRE","45°"],
      ]
    },
    {
      titolo:"Ginocchio / Caviglia",
      righe:[
        ["Ginocchio Fl.","ginFl","135°"],
        ["Ginocchio Est.","ginEst","0°"],
        ["Dorsiflessione","cavDF","20°"],
        ["Plantarflessione","cavPF","50°"],
      ]
    }
  ];

  return (
    <div className="space-y-4">

      {sezioni.map(sez=>(
        <div key={sez.titolo} className="border border-zinc-300 rounded-lg overflow-hidden">

          <div className="bg-black text-yellow-500 font-semibold px-3 py-2">
            {sez.titolo}
          </div>

          <table className="w-full text-sm">
            <thead className="bg-zinc-100">
              <tr>
                <th className="text-left px-3 py-2">Movimento</th>
                <th className="py-2 w-24">DX</th>
                <th className="py-2 w-24">SX</th>
                <th className="py-2 w-24">Norm.</th>
              </tr>
            </thead>
            <tbody>
              {sez.righe.map(([lab,key,norm])=>(
                <ROMRow
                  key={key}
                  label={lab}
                  norm={norm}
                  dx={rom[key+"Dx"]||""}
                  sx={rom[key+"Sx"]||""}
                  onDx={(e)=>aggiorna(key+"Dx",e.target.value)}
                  onSx={(e)=>aggiorna(key+"Sx",e.target.value)}
                />
              ))}
            </tbody>
          </table>

        </div>
      ))}

      <TextArea
        label="Note ROM articolare"
        rows={3}
        value={rom.note||""}
        onChange={(e)=>aggiorna("note",e.target.value)}
      />

    </div>
  );
}
