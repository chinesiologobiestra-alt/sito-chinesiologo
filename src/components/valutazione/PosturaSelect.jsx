export default function PosturaSelect({
  label,
  value,
  onChange,
  options = [],
}) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3 items-center py-1">

      <label className="text-[12px] font-medium text-zinc-700">
        {label}
      </label>

      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full

          h-8

          rounded-md
          border
          border-zinc-300

          px-2

          text-[12px]

          bg-white

          focus:outline-none
          focus:ring-1
          focus:ring-yellow-400
          focus:border-yellow-500
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