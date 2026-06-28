export default function Divider({ title }) {

  return (

    <div className="flex items-center gap-4 py-2">

      <div className="flex-1 h-px bg-zinc-300"></div>

      <span className="text-sm font-semibold text-zinc-500 uppercase">

        {title}

      </span>

      <div className="flex-1 h-px bg-zinc-300"></div>

    </div>

  );

}