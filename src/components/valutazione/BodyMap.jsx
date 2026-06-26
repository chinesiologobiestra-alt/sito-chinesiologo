export default function BodyMap() {
  return (
    <div className="border border-zinc-300 rounded-md p-4 bg-white">

      <h4 className="text-[11px] font-semibold uppercase text-zinc-700 mb-3">
        Mappa del dolore
      </h4>

      <div className="grid grid-cols-2 gap-4">

        <div className="border border-dashed border-zinc-400 rounded-md h-[250px] flex items-center justify-center">
          Vista anteriore
        </div>

        <div className="border border-dashed border-zinc-400 rounded-md h-[250px] flex items-center justify-center">
          Vista posteriore
        </div>

      </div>

    </div>
  );
}