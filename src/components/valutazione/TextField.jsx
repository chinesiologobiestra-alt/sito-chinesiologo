export default function TextField({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
}) {
  return (
    <div className={className}>

      <label className="block text-[11px] font-semibold uppercase text-zinc-700 mb-1">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="
          w-full
          h-7
          bg-transparent
          border-0
          border-b
          border-zinc-600
          outline-none
          focus:border-yellow-500
          text-[14px]
        "
      />

    </div>
  );
}