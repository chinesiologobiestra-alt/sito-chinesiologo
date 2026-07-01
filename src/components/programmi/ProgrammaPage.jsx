export default function ProgrammaPage({ children }) {
  return (
    <div className="flex justify-center my-4 bg-zinc-100">

      <div
        className="
          pdf-page
          bg-white
          w-[297mm]
          min-h-[210mm]
          p-[8mm]
          box-border
          border
          border-zinc-300
        "
      >
        {children}
      </div>

    </div>
  );
}