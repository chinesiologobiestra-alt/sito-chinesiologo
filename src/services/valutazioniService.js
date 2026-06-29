import { supabase } from "../lib/supabase";

/* ========================= */
/* CREA VALUTAZIONE */
/* ========================= */

export async function salvaValutazione(pazienteId, scheda) {

  const { data, error } = await supabase
    .from("valutazioni")
    .insert([
      {
        paziente_id: pazienteId,
        data_valutazione: new Date().toISOString(),
        dati: scheda,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;

}

/* ========================= */
/* STORICO PAZIENTE */
/* ========================= */

export async function getValutazioniPaziente(pazienteId) {

  const { data, error } = await supabase
    .from("valutazioni")
    .select("*")
    .eq("paziente_id", pazienteId)
    .order("data_valutazione", {
      ascending: false,
    });

  if (error) throw error;

  return data;

}

/* ========================= */
/* SINGOLA VALUTAZIONE */
/* ========================= */

export async function getValutazione(id) {

  const { data, error } = await supabase
    .from("valutazioni")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;

}

/* ========================= */
/* MODIFICA */
/* ========================= */

export async function updateValutazione(id, scheda) {

  const { data, error } = await supabase
    .from("valutazioni")
    .update({
      dati: scheda,
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

export async function eliminaValutazione(id) {

  const { error } = await supabase
    .from("valutazioni")
    .delete()
    .eq("id", id);

  if (error) throw error;

}