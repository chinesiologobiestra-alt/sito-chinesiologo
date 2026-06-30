import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Header() {
  return (
    <div className="mb-2">

      {/* HEADER */}
      <div className="bg-[#090909] border border-yellow-500 rounded-t-xl overflow-hidden">

        <div className="flex h-[95px]">

          {/* LOGO */}
          <div className="w-[90px] flex items-center justify-center border-r border-yellow-600">

            <img
              src="/logo.png"
              alt="Logo Fabio Biestra"
              className="w-[65px] h-[65px] object-contain"
            />

          </div>

          {/* NOME */}
          <div className="w-[290px] px-4 flex flex-col justify-center border-r border-yellow-600">

            <h1 className="text-white text-[20px] font-bold tracking-wide whitespace-nowrap">
              FABIO BIESTRA
            </h1>

            <p className="text-yellow-500 text-[12px] tracking-[0.35em] mt-1">
              CHINESIOLOGO
            </p>

            <p className="text-white text-[11px] mt-2">
              www.fabiobiestrachinesiologo.it
            </p>

          </div>

          {/* CONTATTI */}
          <div className="flex-1 px-4 flex flex-col justify-center gap-2 border-r border-yellow-600">

            <div className="flex items-center gap-2 text-white text-[12px]">

              <FaPhoneAlt className="text-yellow-500 text-[11px]" />

              <span>342 562 0513</span>

            </div>

            <div className="flex items-center gap-2 text-white text-[12px]">

              <FaEnvelope className="text-yellow-500 text-[11px]" />

              <span>chinesiologo.biestra@gmail.com</span>

            </div>

            <div className="flex items-center gap-2 text-white text-[12px]">

              <FaMapMarkerAlt className="text-yellow-500 text-[11px]" />

              <span>Via ________________________</span>

            </div>

          </div>

          {/* DATA */}
          <div className="w-[140px] p-2">

            <div className="border border-yellow-500 rounded-lg h-full px-2 py-2 flex flex-col justify-between">

              <div>

                <p className="text-[9px] uppercase text-yellow-500 font-semibold">
                  DATA VALUTAZIONE
                </p>

                <div className="border-b border-white mt-3"></div>

              </div>

              <div>

                <p className="text-[9px] uppercase text-yellow-500 font-semibold">
                  N° SCHEDA
                </p>

                <div className="border-b border-white mt-3"></div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* TITOLO */}

      <div className="border-x border-b border-yellow-500 rounded-b-xl bg-white py-1.5 px-3">

        <div className="flex items-center gap-4">

          <div className="flex-1 h-[2px] bg-yellow-500"></div>

          <h2 className="text-[16px] font-semibold tracking-wide text-zinc-900 whitespace-nowrap">
            SCHEDA DI VALUTAZIONE POSTURALE E FUNZIONALE
          </h2>

          <div className="flex-1 h-[2px] bg-yellow-500"></div>

        </div>

      </div>

    </div>
  );
}