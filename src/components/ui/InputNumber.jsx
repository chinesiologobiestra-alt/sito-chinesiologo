export default function InputNumber({

  label,
  value,
  onChange,
  suffix = "",

}) {

  return (

    <div className="space-y-1">

      <label className="block text-sm font-medium text-zinc-700">

        {label}

      </label>

      <div className="relative">

        <input
          type="number"
          value={value}
          onChange={onChange}
          className="
            w-full
            rounded-xl
            border
            border-zinc-300
            bg-white
            px-4
            py-3
            pr-12
            outline-none
            transition
            focus:border-yellow-500
            focus:ring-2
            focus:ring-yellow-200
          "
        />

        {suffix && (

          <span
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-zinc-500
              text-sm
            "
          >

            {suffix}

          </span>

        )}

      </div>

    </div>

  );

}