import { FaUser } from "react-icons/fa";

export default function SectionTitle({
  icon = <FaUser />,
  title,
}) {
  return (
    <div className="mt-4">

      <div className="bg-black border border-yellow-500 rounded-md overflow-hidden">

        <div className="flex items-center">

          <div className="w-11 h-11 flex items-center justify-center border-r border-yellow-500 text-yellow-500">
            {icon}
          </div>

          <div className="flex-1 px-4">

            <h3 className="text-yellow-500 font-semibold tracking-wide text-[15px] uppercase">
              {title}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}