export default function PosturaSelect({
  label,
  value,
  onChange,
  options = [],
}) {
  return (
    <div className="grid grid-cols-2 gap-4 items-center py-2">

      <label className="font-medium text-zinc-700">
        {label}
      </label>

      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-lg
          border
          border-zinc-300
          px-3
          py-2
          bg-white
          focus:outline-none
          focus:ring-2
          focus:ring-yellow-400
        "
      >
        <option value="">Seleziona...</option>

        {options.map((opzione) => (
          <option
            key={opzione}
            value={opzione}
          >
            {opzione}
          </option>
        ))}

      </select>

    </div>
  );
}