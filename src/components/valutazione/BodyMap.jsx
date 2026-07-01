import front from "../../assets/bodymap/front.png";
import back from "../../assets/bodymap/back.png";

export default function BodyMap() {
  return (
    <div className="border border-zinc-300 rounded-md p-4 bg-white">

      <h4 className="text-[11px] font-semibold uppercase text-zinc-700 mb-3">
        Mappa del dolore
      </h4>

      <div className="grid grid-cols-2 gap-6">

        <div className="border border-zinc-300 rounded-md p-3 flex justify-center items-center bg-zinc-50">
          <img
            src={front}
            alt="Vista anteriore"
            className="h-[240px] object-contain"
          />
        </div>

        <div className="border border-zinc-300 rounded-md p-3 flex justify-center items-center bg-zinc-50">
          <img
            src={back}
            alt="Vista posteriore"
            className="h-[240px] object-contain"
          />
        </div>

      </div>

    </div>
  );
}