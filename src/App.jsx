export default function App() {
const services = [
'Valutazione chinesiologica',
'Rieducazione posturale',
'Recupero infortuni e dolore',
'Dimagrimento funzionale',
'Allenamento personalizzato',
'Benessere e prevenzione',
];

const faq = [
{
q: 'Cos’è la chinesiologia?',
a: 'La chinesiologia studia il movimento umano e il suo ruolo nel benessere generale della persona.',
},
{
q: 'Posso iniziare anche se sono sedentario?',
a: 'Sì. Ogni percorso viene personalizzato in base al tuo livello di partenza.',
},
{
q: 'Serve una preparazione fisica?',
a: 'No, il percorso viene adattato alla persona e ai suoi obiettivi.',
},
];

const method = [
'Valutazione iniziale',
'Analisi postura e movimento',
'Percorso personalizzato',
'Benessere e continuità',
];

const scrollTo = (id) => {
document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

return ( <div className="bg-black text-white min-h-screen"> <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-yellow-700/20"> <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center"> <div> <h1 className="text-yellow-500 text-2xl font-bold">FB</h1> <p className="text-sm text-gray-400">Fabio Biestra – Chinesiologo</p> </div>

```
      <nav className="hidden md:flex gap-6 text-sm text-gray-300">
        <button onClick={() => scrollTo('chi-sono')}>Chi sono</button>
        <button onClick={() => scrollTo('servizi')}>Servizi</button>
        <button onClick={() => scrollTo('metodo')}>Metodo</button>
        <button onClick={() => scrollTo('faq')}>FAQ</button>
        <button onClick={() => scrollTo('contatti')}>Contatti</button>
      </nav>

      <a
        href="https://wa.me/393425620513?text=Ciao%20Fabio%2C%20vorrei%20prenotare%20una%20consulenza"
        target="_blank"
        className="bg-yellow-500 text-black px-5 py-2 rounded-full font-semibold"
      >
        Prenota
      </a>
    </div>
  </header>

  <section className="text-center py-24 px-6">
    <p className="uppercase tracking-[0.3em] text-yellow-500 mb-4">Provincia di Pisa</p>
    <h1 className="text-5xl md:text-7xl font-bold">
      Fabio Biestra <span className="text-yellow-500">Chinesiologo</span>
    </h1>
    <p className="text-gray-300 max-w-3xl mx-auto mt-6 text-xl">
      Percorsi personalizzati orientati a postura, benessere e qualità del movimento.
    </p>
    <blockquote className="italic text-yellow-400 mt-8 text-2xl max-w-3xl mx-auto">
      “Il vero benessere nasce dall’equilibrio tra mente, corpo e movimento.”
    </blockquote>
  </section>

  <section id="chi-sono" className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
    <div>
      <h2 className="text-4xl font-bold text-yellow-500 mb-6">Chi sono</h2>
      <p className="text-gray-300 leading-8">
        Sono Fabio Biestra, laureato in Scienze delle Attività Motorie e Sportive.
        Mi occupo di postura e benessere generale, accompagnando soprattutto persone sedentarie in un percorso personalizzato.
      </p>
    </div>

    <div className="flex justify-center">
      <img
        src="/fabio-biestra.jpg"
        alt="Fabio Biestra"
        className="rounded-[2rem] border border-yellow-600/30 w-[380px] object-cover shadow-2xl"
      />
    </div>
  </section>

  <section id="servizi" className="bg-zinc-950 py-20 px-6">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl text-yellow-500 font-bold text-center mb-12">Servizi</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service} className="bg-zinc-900 rounded-3xl p-6 border border-yellow-700/20 hover:border-yellow-500 transition">
            <h3 className="text-yellow-400 font-semibold text-xl">{service}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section id="metodo" className="py-20 px-6 max-w-7xl mx-auto">
    <h2 className="text-4xl text-yellow-500 font-bold text-center mb-12">Metodo di lavoro</h2>
    <div className="grid md:grid-cols-4 gap-6">
      {method.map((step, i) => (
        <div key={step} className="bg-zinc-900 p-6 rounded-3xl border border-yellow-700/20 text-center">
          <p className="text-yellow-500 text-3xl font-bold mb-3">0{i + 1}</p>
          <h3 className="font-semibold">{step}</h3>
        </div>
      ))}
    </div>
  </section>

  <section id="faq" className="bg-zinc-950 py-20 px-6">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl text-yellow-500 font-bold text-center mb-12">FAQ</h2>
      <div className="space-y-4">
        {faq.map((item) => (
          <div key={item.q} className="bg-zinc-900 rounded-2xl p-6 border border-yellow-700/20">
            <h3 className="font-semibold text-yellow-400 mb-2">{item.q}</h3>
            <p className="text-gray-300">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section id="contatti" className="text-center py-20 px-6">
    <h2 className="text-4xl text-yellow-500 font-bold mb-6">Prenota una consulenza</h2>
    <p className="text-gray-300 mb-8">Contattami direttamente per iniziare il tuo percorso.</p>
    <a
      href="https://wa.me/393425620513?text=Ciao%20Fabio%2C%20vorrei%20prenotare%20una%20consulenza"
      target="_blank"
      className="bg-yellow-500 text-black px-8 py-4 rounded-full font-bold"
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
