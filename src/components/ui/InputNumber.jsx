export default function InputNumber({

  label,
  value,
  onChange,
  suffix = "",

}) {

  return (

    <div className="space-y-0.5">

      <label className="block text-[10px] font-semibold uppercase tracking-wide text-zinc-700">

        {label}

      </label>

      <div className="relative">

        <input
          type="number"
          value={value}
          onChange={onChange}
          className="
            w-full
            h-9

            rounded-lg

            border
            border-zinc-300

            bg-white

            px-3
            pr-10

            text-[13px]

            outline-none
            transition

            focus:border-yellow-500
            focus:ring-1
            focus:ring-yellow-200
          "
        />

        {suffix && (

          <span
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2

              text-[11px]
              text-zinc-500
            "
          >

            {suffix}

          </span>

        )}

      </div>

    </div>

  );

}