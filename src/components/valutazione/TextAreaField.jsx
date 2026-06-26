export default function TextAreaField({
  label,
  value,
  onChange,
  rows = 4,
  className = "",
}) {
  return (
    <div className={className}>

      <label className="block text-[11px] font-semibold uppercase text-zinc-700 mb-1">
        {label}
      </label>

      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        className="
          w-full
          resize-none
          border
          border-zinc-300
          rounded-md
          p-2
          text-sm
          outline-none
          focus:border-yellow-500
        "
      />

    </div>
  );
}