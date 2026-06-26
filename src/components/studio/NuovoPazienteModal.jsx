import { useState } from "react";

export default function NuovoPazienteModal({
  open,
  onClose,
  onSave,
}) {

  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    telefono: "",
    email: "",
    dataNascita: "",
  });

  if (!open) return null;

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function salva() {

    onSave(form);

    setForm({
      nome: "",
      cognome: "",
      telefono: "",
      email: "",
      dataNascita: "",
    });

  }

  return (

    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-[600px] p-8">

        <h2 className="text-2xl font-bold mb-6">
          Nuovo Paziente
        </h2>

        <div className="space-y-4">

          <input
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            name="cognome"
            placeholder="Cognome"
            value={form.cognome}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            name="telefono"
            placeholder="Telefono"
            value={form.telefono}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="date"
            name="dataNascita"
            value={form.dataNascita}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border"
          >
            Annulla
          </button>

          <button
            onClick={salva}
            className="px-5 py-2 rounded-lg bg-yellow-500 font-semibold"
          >
            Salva
          </button>

        </div>

      </div>

    </div>

  );

}