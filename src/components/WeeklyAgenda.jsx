import { useEffect, useState } from "react";

import {
  startOfWeek,
  addDays,
  format,
  addWeeks,
  subWeeks,
} from "date-fns";

import { it } from "date-fns/locale";

import { supabase } from "../lib/supabase";

const hours = [];

for (let i = 8; i <= 22; i++) {

  hours.push(
    `${String(i).padStart(2, "0")}:00`
  );
}

export default function WeeklyAgenda() {

  const [currentWeek, setCurrentWeek] =
    useState(new Date());

  const [slots, setSlots] = useState([]);

  useEffect(() => {

    loadSlots();

  }, [currentWeek]);

  const loadSlots = async () => {

    const start =
      startOfWeek(currentWeek, {
        weekStartsOn: 1,
      });

    const end = addDays(start, 6);

    const { data } = await supabase
      .from("availability_slots")
      .select("*")
      .gte(
        "slot_date",
        format(start, "yyyy-MM-dd")
      )
      .lte(
        "slot_date",
        format(end, "yyyy-MM-dd")
      );

    setSlots(data || []);
  };

  const toggleSlot = async (
  day,
  hour
) => {

  const date =
    format(day, "yyyy-MM-dd");

  const existing = slots.find(
    (slot) =>
      slot.slot_date === date &&
      slot.slot_time === hour
  );

  if (!existing) {

    await supabase
      .from("availability_slots")
      .insert({
        slot_date: date,
        slot_time: hour,
        available: true,
      });

  } else if (
    existing.available === true
  ) {

    await supabase
      .from("availability_slots")
      .update({
        available: false,
      })
      .eq("id", existing.id);

  } else {

    await supabase
      .from("availability_slots")
      .delete()
      .eq("id", existing.id);

  }

  await loadSlots();
};

  const weekDays = [];

  const start =
    startOfWeek(currentWeek, {
      weekStartsOn: 1,
    });

  for (let i = 0; i < 7; i++) {

    weekDays.push(addDays(start, i));
  }

  const getSlotColor = (
    day,
    hour
  ) => {

    const date =
      format(day, "yyyy-MM-dd");

    const booking = slots.find(
      (slot) =>
        slot.slot_date === date &&
        slot.slot_time === hour &&
        slot.available === false
    );

    if (booking) {
      return "bg-red-600 border border-red-300";
    }

    const available = slots.find(
      (slot) =>
        slot.slot_date === date &&
        slot.slot_time === hour &&
        slot.available === true
    );

    if (available) {
      return "bg-blue-600 border border-blue-300";
    }

    return "bg-zinc-800";
  };

  return (

    <div className="bg-black border border-yellow-700 rounded-3xl p-6 overflow-x-auto">

      <div className="flex justify-between items-center mb-8">

        <button
          onClick={() =>
            setCurrentWeek(
              subWeeks(currentWeek, 1)
            )
          }
          className="px-4 py-2 border border-yellow-700 rounded-xl text-yellow-400"
        >
          ←
        </button>

        <h2 className="text-3xl font-bold text-yellow-500">

          {format(
            weekDays[0],
            "dd MMM",
            { locale: it }
          )}{" "}

          -{" "}

          {format(
            weekDays[6],
            "dd MMM yyyy",
            { locale: it }
          )}

        </h2>

        <button
          onClick={() =>
            setCurrentWeek(
              addWeeks(currentWeek, 1)
            )
          }
          className="px-4 py-2 border border-yellow-700 rounded-xl text-yellow-400"
        >
          →
        </button>

      </div>

      <div className="grid grid-cols-8 gap-2 min-w-[1200px]">

        <div />

        {weekDays.map((day) => (

          <div
            key={day.toString()}
            className="text-center text-yellow-400 font-bold"
          >

            <div>
              {format(day, "EEE", {
                locale: it,
              })}
            </div>

            <div>
              {format(day, "dd/MM")}
            </div>

          </div>

        ))}

        {hours.map((hour) => (

          <>

            <div
              key={hour}
              className="text-white py-3"
            >
              {hour}
            </div>

            {weekDays.map((day) => (

              <div
                key={`${day}-${hour}`}
                onClick={() =>
                  toggleSlot(day, hour)
                }
                className={`h-14 rounded-xl cursor-pointer hover:scale-105 transition ${getSlotColor(
                  day,
                  hour
                )}`}
              />

            ))}

          </>

        ))}

      </div>

    </div>

  );
}