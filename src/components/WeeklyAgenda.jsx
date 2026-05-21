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
  const [selectedSlot, setSelectedSlot] = useState(null);
const [showModal, setShowModal] = useState(false);

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

  const { data } = await supabase
  .from("availability_slots")
  .select("*")
  .gte(
    "slot_date",
    format(
      startOfWeek(currentWeek, {
        weekStartsOn: 1,
      }),
      "yyyy-MM-dd"
    )
  );

setSlots(data || []);
};

const saveSlot = async (type) => {

  const date =
    format(
      selectedSlot.day,
      "yyyy-MM-dd"
    );

  const existing = slots.find(
    (slot) =>
      slot.slot_date === date &&
      slot.slot_time === selectedSlot.hour
  );

  if (type === "delete") {

    if (existing) {

      await supabase
        .from("availability_slots")
        .delete()
        .eq("id", existing.id);

    }

  } else {

    const payload = {
      slot_date: date,
      slot_time: selectedSlot.hour,
      available: type !== "occupied",
      location: type,
    };

    if (existing) {

      await supabase
        .from("availability_slots")
        .update(payload)
        .eq("id", existing.id);

    } else {

      await supabase
        .from("availability_slots")
        .insert(payload);

    }

  }

  setShowModal(false);

  loadSlots();
};

  const weekDays = [];

  const start =
    startOfWeek(currentWeek, {
      weekStartsOn: 1,
    });

  for (let i = 0; i < 7; i++) {

    weekDays.push(addDays(start, i));
  }

  const getSlotColor = (day, hour) => {

  const date =
    format(day, "yyyy-MM-dd");

  const slot = slots.find(
    (s) =>
      s.slot_date === date &&
      s.slot_time === hour
  );

  if (!slot) {
    return "bg-zinc-800";
  }

  if (slot.location === "studio1") {
    return "bg-blue-600 border border-blue-300";
  }

  if (slot.location === "studio2") {
    return "bg-green-600 border border-green-300";
  }

  if (slot.location === "occupied") {
    return "bg-red-600 border border-red-300";
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
                onClick={() => {
  setSelectedSlot({
    day,
    hour,
  });
  setShowModal(true);
}}
                className={`h-14 rounded-xl cursor-pointer hover:scale-105 transition ${getSlotColor(
                  day,
                  hour
                )}`}
              />

            ))}

          </>

        ))}

            </div>
            {showModal && (

  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">

    <div className="bg-zinc-900 border border-yellow-700 rounded-3xl p-8 w-96">

      <h3 className="text-yellow-500 text-xl font-bold mb-6">
        Seleziona disponibilità
      </h3>

      <div className="space-y-3">

        <button
          onClick={() => saveSlot("studio1")}
          className="w-full bg-blue-600 p-3 rounded-xl"
        >
          Disponibile - Studio Provvisorio
        </button>

        <button
          onClick={() => saveSlot("studio2")}
          className="w-full bg-green-600 p-3 rounded-xl"
        >
          Disponibile - Studio Provvisorio 2
        </button>

        <button
          onClick={() => saveSlot("occupied")}
          className="w-full bg-red-600 p-3 rounded-xl"
        >
          Occupato
        </button>

        <button
          onClick={() => saveSlot("delete")}
          className="w-full bg-zinc-700 p-3 rounded-xl"
        >
          Non prenotabile
        </button>

      </div>

    </div>

  </div>

)}

      <div className="mt-8 bg-zinc-900 border border-yellow-700 rounded-2xl p-4">

        <h3 className="text-yellow-500 font-semibold mb-4">
          Legenda disponibilità
        </h3>

        <div className="flex flex-wrap gap-6 text-sm">

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-zinc-800 rounded"></div>
            <span className="text-gray-300">
              Non prenotabile
            </span>
          </div>

          <div className="flex items-center gap-2">
  <div className="w-4 h-4 bg-blue-600 rounded"></div>
  <span className="text-gray-300">
    Disponibile - Studio Provvisorio
  </span>
</div>

<div className="flex items-center gap-2">
  <div className="w-4 h-4 bg-green-600 rounded"></div>
  <span className="text-gray-300">
    Disponibile - Studio Provvisorio 2
  </span>
</div>

<div className="flex items-center gap-2">
  <div className="w-4 h-4 bg-red-600 rounded"></div>
  <span className="text-gray-300">
    Occupato
  </span>
</div>

        </div>

      </div>

    </div>

  );
}