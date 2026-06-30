import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Topbar() {

  const navigate = useNavigate();

  async function handleLogout() {

    await supabase.auth.signOut();

    navigate("/");

  }

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">

      <h1 className="text-xl font-bold">
        Gestionale Studio
      </h1>

      <div className="flex items-center gap-3">

        <button
          onClick={() => window.open("/", "_blank")}
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
          🌐 Sito Web
        </button>

        <button
          onClick={handleLogout}
          className="
            px-4
            py-2
            rounded-lg
            bg-red-600
            hover:bg-red-500
            text-white
            font-medium
            transition
          "
        >
          🚪 Esci
        </button>

        <span className="text-sm text-gray-500">
          Fabio Biestra
        </span>

      </div>

    </header>
  );
}