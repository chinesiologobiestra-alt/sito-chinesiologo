import { supabase } from "../lib/supabase";

/* ========================= */
/* CREA PROGRAMMA */
/* ========================= */

export async function salvaProgramma(pazienteId, programma) {

  const { data, error } = await supabase
    .from("programmi")
    .insert([
      {
        paziente_id: pazienteId,
        nome: programma.nome,
        obiettivo: programma.obiettivo,
        settimane: programma.settimane,
        note_generali: programma.noteGenerali,
        giorni: programma.giorni,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;

}

/* ========================= */
/* STORICO PROGRAMMI */
/* ========================= */

export async function getProgrammiPaziente(pazienteId) {

  const { data, error } = await supabase
    .from("programmi")
    .select("*")
    .eq("paziente_id", pazienteId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;

}

/* ========================= */
/* SINGOLO PROGRAMMA */
/* ========================= */

export async function getProgramma(id) {

  const { data, error } = await supabase
    .from("programmi")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;

}

/* ========================= */
/* MODIFICA */
/* ========================= */

export async function updateProgramma(id, programma) {

  const { data, error } = await supabase
    .from("programmi")
    .update({
      nome: programma.nome,
      obiettivo: programma.obiettivo,
      settimane: programma.settimane,
      note_generali: programma.noteGenerali,
      giorni: programma.giorni,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;

}

/* ========================= */
/* ELIMINA */
/* ========================= */

export async function eliminaProgramma(id) {

  const { error } = await supabase
    .from("programmi")
    .delete()
    .eq("id", id);

  if (error) throw error;

}