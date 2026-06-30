export default function CheckGroup({

  label,
  values,
  onChange,
  options,

}) {

  function toggle(voce) {

    if (values.includes(voce)) {

      onChange(
        values.filter((v) => v !== voce)
      );

    } else {

      onChange([
        ...values,
        voce,
      ]);

    }

  }

  return (

    <div className="space-y-1">

      <div className="text-[11px] font-semibold text-zinc-700">

        {label}

      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1">

        {options.map((opzione) => (

          <label
            key={opzione}
            className="flex items-center gap-1 text-[12px] cursor-pointer"
          >

            <input
              type="checkbox"
              checked={values.includes(opzione)}
              onChange={() => toggle(opzione)}
              className="scale-90"
            />

            {opzione}

          </label>

        ))}

      </div>

    </div>

  );

}