export default function ProgrammaPage({ children }) {
  return (
    <div className="flex justify-center my-6">
      <div
        className="
          pdf-page
          bg-white
          w-[297mm]
          min-h-[210mm]
          p-[10mm]
          shadow-xl
          border
          border-zinc-300
          overflow-hidden
        "
      >
        {children}
      </div>
    </div>
  );
}