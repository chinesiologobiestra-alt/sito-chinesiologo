export default function Page({ children }) {
  return (
    <div className="flex justify-center py-10 bg-zinc-200 min-h-screen print:bg-white print:p-0">

      <div
  className="
    bg-white
    w-[210mm]
    min-h-[297mm]
    mx-auto
    shadow-2xl
    box-border

    px-[8mm]
    pt-[8mm]
    pb-[8mm]

    print:shadow-none
    print:m-0
  "
>
    {children}
</div>

    </div>
  );
}