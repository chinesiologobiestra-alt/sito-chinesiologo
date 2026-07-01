import { supabase } from "../lib/supabase";

export async function getBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("booking_date", { ascending: true })
    .order("booking_time", { ascending: true });

  if (error) throw error;

  return data || [];
}

export async function creaBooking(booking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([booking])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function eliminaBooking(id) {
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function aggiornaBooking(id, valori) {
  const { data, error } = await supabase
    .from("bookings")
    .update(valori)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}