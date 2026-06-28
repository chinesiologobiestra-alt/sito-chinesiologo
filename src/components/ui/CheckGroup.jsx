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

    <div className="space-y-2">

      <div className="text-sm font-medium">

        {label}

      </div>

      <div className="grid grid-cols-2 gap-2">

        {options.map((opzione) => (

          <label
            key={opzione}
            className="flex items-center gap-2 cursor-pointer"
          >

            <input
              type="checkbox"
              checked={values.includes(opzione)}
              onChange={() => toggle(opzione)}
            />

            {opzione}

          </label>

        ))}

      </div>

    </div>

  );

}