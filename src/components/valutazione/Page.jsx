export default function Page({ children }) {
  return (
    <div
      className="
        flex
        justify-center
        py-10
        bg-zinc-200

        print:p-0
        print:bg-white
      "
    >
      <div
        className="
          pdf-page

          bg-white

          w-[210mm]
          h-[297mm]

          box-border
          overflow-hidden

          shadow-2xl

          p-[10mm]

          print:shadow-none
          print:m-0
        "
      >
        {children}
      </div>
    </div>
  );
}