import { useNavigate } from "react-router-dom";

export default function Topbar() {

  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">

      <h1 className="text-xl font-bold">
        Gestionale Studio
      </h1>

      <div className="flex items-center gap-4">

        <button
          onClick={() => navigate("/")}
          className="
            px-4
            py-2
            rounded-lg
            border
            border-zinc-300
            bg-white
            hover:bg-zinc-100
            text-zinc-700
            font-medium
            transition
          "
        >
          ← Sito
        </button>

        <span className="text-sm text-gray-500">
          Fabio Biestra
        </span>

      </div>

    </header>
  );
}