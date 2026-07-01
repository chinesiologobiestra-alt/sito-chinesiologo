import { NavLink } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    path: "/studio",
  },
  {
    name: "Pazienti",
    path: "/studio/pazienti",
  },

  {
    name: "Archivio",
    path: "/studio/archivio",
  },
  {
    name: "Programmi",
    path: "/studio/programma",
  },

  {
  name: "Agenda",
  path: "/studio/agenda",
},
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 text-white flex flex-col">

      <div className="border-b border-zinc-700 p-6">

        <h2 className="text-xl font-bold text-yellow-500">
          Fabio Biestra
        </h2>

        <p className="text-sm text-zinc-400">
          Studio
        </p>

      </div>

      <nav className="flex-1 p-3">

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 mb-2 transition ${
                isActive
                  ? "bg-yellow-500 text-black font-semibold"
                  : "hover:bg-zinc-800"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}

      </nav>

    </aside>
  );
}