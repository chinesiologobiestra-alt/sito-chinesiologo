export default function RadioGroup({

  label,
  value,
  onChange,
  options,

}) {

  return (

    <div className="space-y-2">

      <div className="text-sm font-medium">

        {label}

      </div>

      <div className="flex flex-wrap gap-5">

        {options.map((opzione) => (

          <label
            key={opzione}
            className="flex items-center gap-2 cursor-pointer"
          >

            <input
              type="radio"
              checked={value === opzione}
              onChange={() => onChange(opzione)}
            />

            {opzione}

          </label>

        ))}

      </div>

    </div>

  );

}