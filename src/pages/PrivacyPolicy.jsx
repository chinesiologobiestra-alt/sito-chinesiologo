export default function PrivacyPolicy() {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold text-yellow-500 mb-10">
          Privacy Policy
        </h1>

        <p className="mb-6">
          Questa informativa descrive le modalità di trattamento
          dei dati personali degli utenti che visitano il sito
          di Fabio Biestra.
        </p>

        <h2 className="text-2xl text-yellow-500 mt-10 mb-4">
          Titolare del trattamento
        </h2>

        <p>
          Fabio Biestra
          <br />
          Email: info@fabiobiestrachinesiologo.it
        </p>

        <h2 className="text-2xl text-yellow-500 mt-10 mb-4">
          Dati raccolti
        </h2>

        <p>
          Attraverso il modulo di contatto e prenotazione possono
          essere raccolti nome, email, numero di telefono e dati
          necessari alla gestione degli appuntamenti.
        </p>

        <h2 className="text-2xl text-yellow-500 mt-10 mb-4">
          Finalità del trattamento
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Gestione delle richieste di contatto</li>
          <li>Gestione delle prenotazioni</li>
          <li>Comunicazioni con gli utenti</li>
          <li>Adempimenti di legge</li>
        </ul>

        <h2 className="text-2xl text-yellow-500 mt-10 mb-4">
          Diritti dell'interessato
        </h2>

        <p>
          L'utente può richiedere accesso, modifica,
          cancellazione o limitazione del trattamento dei dati
          scrivendo all'indirizzo email sopra indicato.
        </p>

      </div>
    </div>
  );
}