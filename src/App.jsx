export default function App() {
  const services = [
    'Valutazione chinesiologica',
    'Rieducazione posturale',
    'Recupero infortuni e dolore',
    'Dimagrimento funzionale',
    'Allenamento personalizzato',
    'Benessere e prevenzione',
  ];

  const certifications = [
    'Laurea Triennale in Scienze delle Attività Motorie e Sportive',
    'Ginnastica Posturale I, II e III livello',
    'Tecnico Analisi della Postura',
    'Recupero Motorio e Funzionale Post‑Traumatico',
    'Ginnastica Ipopressiva',
    'Ginnastica Posturale in Gravidanza',
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-yellow-700/30 sticky top-0 z-50 bg-black/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-yellow-500">FB</h1>
            <p className="text-sm text-gray-400">Fabio Biestra – Chinesiologo</p>
          </div>
          <a
            href="https://wa.me/393425620513?text=Ciao%20Fabio%2C%20vorrei%20prenotare%20una%20consulenza%20chinesiologica"
            target="_blank"
            className="bg-yellow-500 text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            Prenota su WhatsApp
          </a>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <p className="uppercase tracking-[0.3em] text-yellow-500 mb-4">
          Provincia di Pisa
        </p>
        <h2 className="text-5xl md:text-7xl font-bold leading-tight">
          Fabio Biestra <span className="text-yellow-500">Chinesiologo</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mt-8">
          Percorsi personalizzati orientati a postura, benessere e qualità del movimento.
        </p>
        <blockquote className="italic text-yellow-400 text-2xl mt-10 max-w-3xl mx-auto">
          “Il vero benessere nasce dall’equilibrio tra mente, corpo e movimento.”
        </blockquote>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-4xl font-bold mb-6 text-yellow-500">Chi sono</h3>
          <p className="text-gray-300 leading-8">
            Sono Fabio Biestra, chinesiologo laureato in Scienze delle Attività Motorie e Sportive.
            Il mio obiettivo è aiutare le persone a ritrovare equilibrio, benessere e qualità di vita
            attraverso il movimento, con un approccio personalizzato orientato a postura e benessere generale.
          </p>
          <p className="text-gray-300 leading-8 mt-4">
            La prima persona che ho imparato ad aiutare è stata me stesso. Oggi accompagno chi desidera
            stare meglio, ritrovare fiducia nel proprio corpo e costruire un percorso sostenibile nel tempo.
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src="/fabio-biestra.jpg"
            alt="Fabio Biestra"
            className="rounded-[2rem] shadow-2xl border border-yellow-600/40 w-[380px] object-cover"
          />
        </div>
      </section>

      <section className="bg-zinc-950 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-yellow-500 mb-12">
            Servizi
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service} className="bg-zinc-900 p-6 rounded-3xl border border-yellow-700/20 hover:border-yellow-500 transition">
                <h4 className="text-xl font-semibold text-yellow-400">{service}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-4xl font-bold text-yellow-500 text-center mb-12">
          Formazione & Specializzazioni
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {certifications.map((item) => (
            <div key={item} className="bg-zinc-900 rounded-2xl p-5 border border-yellow-700/20">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-950 py-20 text-center px-6">
        <h3 className="text-4xl font-bold text-yellow-500 mb-6">
          Prenota una consulenza
        </h3>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Inizia oggi il tuo percorso verso un maggiore benessere fisico attraverso un approccio personalizzato.
        </p>
        <a
          href="https://wa.me/393425620513?text=Ciao%20Fabio%2C%20vorrei%20prenotare%20una%20consulenza%20chinesiologica"
          target="_blank"
          className="bg-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg"
        >
          Contattami su WhatsApp
        </a>
      </section>

      <footer className="border-t border-yellow-700/20 py-8 text-center text-gray-400">
        <p>Fabio Biestra – Chinesiologo</p>
        <p>Provincia di Pisa</p>
        <p>info@fabiobiestrachinesiologo.it</p>
      </footer>
    </div>
  );
}
