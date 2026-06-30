export default function SectionBox({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        border
        border-zinc-300
        rounded-md
        bg-white

        p-3

        ${className}
      `}
    >
      {children}
    </div>
  );
}