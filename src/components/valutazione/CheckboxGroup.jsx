export default function CheckboxGroup({
  title,
  items,
  values = [],
  onToggle,
}) {
  return (
    <div>

      <h4 className="text-[11px] font-semibold uppercase text-zinc-700 mb-3">
        {title}
      </h4>

      <div className="space-y-2">

        {items.map((item) => (

          <label
            key={item}
            className="flex items-center gap-2 text-[13px] cursor-pointer"
          >

            <input
              type="checkbox"
              checked={values.includes(item)}
              onChange={() => onToggle(item)}
              className="w-4 h-4 accent-yellow-500"
            />

            <span>{item}</span>

          </label>

        ))}

      </div>

    </div>
  );
}