import { supabase } from "../lib/supabase";

export async function getPazienti() {
  const { data, error } = await supabase
    .from("pazienti")
    .select("*")
    .order("cognome", { ascending: true });

  if (error) throw error;

  return data;
}

export async function creaPaziente(paziente) {
  const { data, error } = await supabase
    .from("pazienti")
    .insert([
      {
        nome: paziente.nome,
        cognome: paziente.cognome,
        telefono: paziente.telefono,
        email: paziente.email,
        data_nascita: paziente.dataNascita || null,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function eliminaPaziente(id) {
  const { error } = await supabase
    .from("pazienti")
    .delete()
    .eq("id", id);

  if (error) throw error;
}