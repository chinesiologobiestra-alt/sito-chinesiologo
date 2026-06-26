export default function FieldLine({
  label,
  width = "w-full",
}) {
  return (
    <div className={width}>
      <p className="text-[12px] font-medium text-zinc-700 mb-1">
        {label}
      </p>

      <div className="border-b border-zinc-700 h-6"></div>
    </div>
  );
}