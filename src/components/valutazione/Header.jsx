import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Header() {
  return (
    <div className="mb-3">

      {/* HEADER */}
      <div className="bg-[#090909] border border-yellow-500 rounded-t-xl overflow-hidden">

        <div className="flex h-[120px]">

          {/* LOGO */}
          <div className="w-[110px] flex items-center justify-center border-r border-yellow-600">

            <img
              src="/logo.png"
              alt="Logo Fabio Biestra"
              className="w-[82px] h-[82px] object-contain"
            />

          </div>

          {/* NOME */}
          <div className="w-[320px] px-5 flex flex-col justify-center border-r border-yellow-600">

            <h1 className="text-white text-[23px] font-bold tracking-wide whitespace-nowrap">
              FABIO BIESTRA
            </h1>

            <p className="text-yellow-500 text-[14px] tracking-[0.45em] mt-2">
              CHINESIOLOGO
            </p>

            <p className="text-white text-[12px] mt-4">
              www.fabiobiestrachinesiologo.it
            </p>

          </div>

          {/* CONTATTI */}
          <div className="flex-1 px-6 flex flex-col justify-center gap-3 border-r border-yellow-600">

            <div className="flex items-center gap-3 text-white text-[14px]">

              <FaPhoneAlt className="text-yellow-500 text-[13px]" />

              <span>342 562 0513</span>

            </div>

            <div className="flex items-center gap-3 text-white text-[14px]">

              <FaEnvelope className="text-yellow-500 text-[13px]" />

              <span>chinesiologo.biestra@gmail.com</span>

            </div>

            <div className="flex items-center gap-3 text-white text-[14px]">

              <FaMapMarkerAlt className="text-yellow-500 text-[13px]" />

              <span>Via ________________________</span>

            </div>

          </div>

          {/* DATA */}
          <div className="w-[165px] p-3">

            <div className="border border-yellow-500 rounded-lg h-full px-3 py-2 flex flex-col justify-between">

              <div>

                <p className="text-[10px] uppercase text-yellow-500 font-semibold">
                  DATA VALUTAZIONE
                </p>

                <div className="border-b border-white mt-4"></div>

              </div>

              <div>

                <p className="text-[10px] uppercase text-yellow-500 font-semibold">
                  N° SCHEDA
                </p>

                <div className="border-b border-white mt-4"></div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* TITOLO */}

      <div className="border-x border-b border-yellow-500 rounded-b-xl bg-white py-2 px-4">

        <div className="flex items-center gap-5">

          <div className="flex-1 h-[2px] bg-yellow-500"></div>

          <h2 className="text-[18px] font-semibold tracking-wide text-zinc-900 whitespace-nowrap">
            SCHEDA DI VALUTAZIONE POSTURALE E FUNZIONALE
          </h2>

          <div className="flex-1 h-[2px] bg-yellow-500"></div>

        </div>

      </div>

    </div>
  );
}