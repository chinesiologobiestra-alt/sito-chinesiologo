import { supabase } from "../lib/supabase";

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