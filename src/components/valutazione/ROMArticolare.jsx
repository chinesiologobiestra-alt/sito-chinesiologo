import TextArea from "../ui/TextArea";

function Cell({value,onChange}){
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      className="
        w-14
        h-7
        border
        border-zinc-300
        rounded
        text-center
        text-[12px]
        outline-none
        focus:border-yellow-500
      "
    />
  );
}

function Riga({label,norm,dx,sx,onDx,onSx,bold=false}){
  if(bold){
    return(
      <tr className="bg-zinc-100">
        <td colSpan={4} className="py-1 px-2 font-bold text-zinc-800">
          {label}
        </td>
      </tr>
    )
  }

  return(
    <tr className="border-b">
      <td className="py-1 px-2 text-[12px]">{label}</td>
      <td className="py-1 text-center"><Cell value={dx} onChange={onDx}/></td>
      <td className="py-1 text-center"><Cell value={sx} onChange={onSx}/></td>
      <td className="py-1 text-center text-[11px] text-zinc-500">{norm}</td>
    </tr>
  )
}

export default function ROMArticolare({scheda,setScheda}){

 const rom=scheda.rom||{};
 const upd=(k,v)=>setScheda({
   ...scheda,
   rom:{...rom,[k]:v}
 });

 const rows=[
  ["Rachide cervicale"],
  ["Flessione","cervFl","50°"],
  ["Estensione","cervEst","60°"],
  ["Rotazione","cervRot","80°"],
  ["Inclinazione","cervInc","45°"],

  ["Spalla"],
  ["Flessione","spFl","180°"],
  ["Abduzione","spAb","180°"],
  ["Rot. Interna","spRI","70°"],
  ["Rot. Esterna","spRE","90°"],

  ["Anca"],
  ["Flessione","anFl","120°"],
  ["Estensione","anEst","20°"],
  ["Abduzione","anAb","45°"],
  ["Rot. Interna","anRI","40°"],
  ["Rot. Esterna","anRE","45°"],

  ["Ginocchio"],
  ["Flessione","ginFl","135°"],
  ["Estensione","ginEst","0°"],

  ["Caviglia"],
  ["Dorsiflessione","cavDF","20°"],
  ["Plantarflessione","cavPF","50°"],
 ];

 return(
  <div className="space-y-3">

    <table className="w-full border border-zinc-300 rounded overflow-hidden">
      <thead className="bg-black text-yellow-500">
        <tr>
          <th className="text-left px-2 py-2">Movimento</th>
          <th className="w-20">DX</th>
          <th className="w-20">SX</th>
          <th className="w-16">Norm.</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r,i)=>r.length==1?
          <Riga key={i} label={r[0]} bold/>:
          <Riga
            key={i}
            label={r[0]}
            norm={r[2]}
            dx={rom[r[1]+"Dx"]||""}
            sx={rom[r[1]+"Sx"]||""}
            onDx={(e)=>upd(r[1]+"Dx",e.target.value)}
            onSx={(e)=>upd(r[1]+"Sx",e.target.value)}
          />
        )}
      </tbody>
    </table>

    <TextArea
      label="Note ROM articolare"
      rows={3}
      value={rom.note||""}
      onChange={(e)=>upd("note",e.target.value)}
    />

  </div>
 )
}
