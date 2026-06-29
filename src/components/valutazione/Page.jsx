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
          min-h-[287mm]

          box-border

          overflow-hidden

          shadow-2xl

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