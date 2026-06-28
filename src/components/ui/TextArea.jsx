export default function TextArea({

  label,
  value,
  onChange,
  rows = 5,

}) {

  return (

    <div className="space-y-1">

      <label className="block text-sm font-medium text-zinc-700">

        {label}

      </label>

      <textarea
        rows={rows}
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
          resize-none
          outline-none
          transition
          focus:border-yellow-500
          focus:ring-2
          focus:ring-yellow-200
        "
      />

    </div>

  );

}