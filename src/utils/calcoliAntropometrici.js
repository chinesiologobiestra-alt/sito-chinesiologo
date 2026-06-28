// ========================================
// CALCOLI ANTROPOMETRICI
// Fabio Biestra Gestionale
// ========================================

// ---------------------------
// BMI
// ---------------------------

export function calcolaBMI(altezza, peso) {

  const h = parseFloat(altezza);
  const p = parseFloat(peso);

  if (!h || !p) return "";

  return (p / Math.pow(h / 100, 2)).toFixed(1);

}

// ---------------------------
// CLASSIFICAZIONE BMI
// ---------------------------

export function classificaBMI(bmi) {

  const valore = parseFloat(bmi);

  if (!valore) return "";

  if (valore < 18.5)
    return "Sottopeso";

  if (valore < 25)
    return "Normopeso";

  if (valore < 30)
    return "Sovrappeso";

  if (valore < 35)
    return "Obesità I grado";

  if (valore < 40)
    return "Obesità II grado";

  return "Obesità III grado";

}

// ---------------------------
// WHR
// ---------------------------

export function calcolaWHR(vita, fianchi) {

  const v = parseFloat(vita);
  const f = parseFloat(fianchi);

  if (!v || !f) return "";

  return (v / f).toFixed(2);

}

// ---------------------------
// CLASSIFICAZIONE WHR
// ---------------------------

export function classificaWHR(whr, sesso) {

  const valore = parseFloat(whr);

  if (!valore) return "";

  if (sesso === "F") {

    if (valore < 0.80)
      return "Basso rischio";

    if (valore < 0.85)
      return "Rischio aumentato";

    return "Alto rischio";

  }

  // Uomo

  if (valore < 0.90)
    return "Basso rischio";

  if (valore < 1)
    return "Rischio aumentato";

  return "Alto rischio";

}

// ---------------------------
// PESO IDEALE (Lorentz)
// ---------------------------

export function pesoIdeale(altezza, sesso) {

  const h = parseFloat(altezza);

  if (!h) return "";

  if (sesso === "F") {

    return (
      h - 100 -
      ((h - 150) / 2)
    ).toFixed(1);

  }

  return (
    h - 100 -
    ((h - 150) / 4)
  ).toFixed(1);

}

// ---------------------------
// DIFFERENZA PESO
// ---------------------------

export function differenzaPeso(peso, ideale) {

  const p = parseFloat(peso);
  const i = parseFloat(ideale);

  if (!p || !i) return "";

  return (p - i).toFixed(1);

}