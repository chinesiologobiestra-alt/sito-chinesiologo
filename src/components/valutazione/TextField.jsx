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

      <label
        className="
          block
          text-[10px]
          font-semibold
          uppercase
          tracking-wide
          text-zinc-700
          mb-0.5
        "
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="
          w-full
          h-6
          bg-transparent
          border-0
          border-b
          border-zinc-600
          outline-none

          text-[13px]

          px-0
          py-0

          focus:border-yellow-500
        "
      />

    </div>
  );
}