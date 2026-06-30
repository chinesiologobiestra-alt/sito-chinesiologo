export default function RadioGroup({

  label,
  value,
  onChange,
  options,

}) {

  return (

    <div className="space-y-1">

      <div className="text-[11px] font-semibold text-zinc-700">

        {label}

      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1">

        {options.map((opzione) => (

          <label
            key={opzione}
            className="flex items-center gap-1 text-[12px] cursor-pointer"
          >

            <input
              type="radio"
              checked={value === opzione}
              onChange={() => onChange(opzione)}
              className="scale-90"
            />

            {opzione}

          </label>

        ))}

      </div>

    </div>

  );

}