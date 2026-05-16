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
import { useState } from "react";

function Prenotazione() {
  const [form, setForm] = useState({
    nome: "",
    telefono: "",
    servizio: "",
    data: "",
    ora: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const invia = () => {
    const msg = `Ciao Fabio, vorrei prenotare:%0A
Nome: ${form.nome}%0A
Telefono: ${form.telefono}%0A
Servizio: ${form.servizio}%0A
Data: ${form.data}%0A
Ora: ${form.ora}`;

    window.open(`https://wa.me/393425620513?text=${msg}`, "_blank");
  };

  return (
    <section id="prenota" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-3xl mx-auto">

        <h2 className="text-4xl font-bold text-yellow-500 text-center mb-10">
          Prenota una consulenza
        </h2>

        <div className="space-y-4">

          <input
            name="nome"
            placeholder="Nome e cognome"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-yellow-700/20"
          />

          <input
            name="telefono"
            placeholder="Telefono"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-yellow-700/20"
          />

          <select
            name="servizio"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-yellow-700/20"
          >
            <option>Seleziona servizio</option>
            <option>Valutazione chinesiologica</option>
            <option>Rieducazione posturale</option>
            <option>Benessere generale</option>
          </select>

          <input
            type="date"
            name="data"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-yellow-700/20"
          />

          <input
            type="time"
            name="ora"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black border border-yellow-700/20"
          />

          <button
            onClick={invia}
            className="w-full bg-yellow-500 text-black font-bold p-4 rounded-xl hover:bg-yellow-400"
          >
            Invia richiesta su WhatsApp
          </button>

        </div>
      </div>
    </section>
  );
}

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

<section id="metodo" className="py-24 px-6 bg-black">
  <div className="max-w-7xl mx-auto text-center">
    <p className="uppercase tracking-[0.3em] text-yellow-500 mb-3">
      Il mio metodo
    </p>

    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
      Prestazioni su misura,
      <span className="text-yellow-500"> risultati concreti</span>
    </h2>

    <div className="w-32 h-[2px] bg-yellow-500 mx-auto mb-8"></div>

    <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-8 mb-16">
      Ogni percorso è unico, costruito su analisi precise, obiettivi chiari
      e un approccio scientifico. Il mio metodo unisce competenza,
      esperienza e attenzione alla persona.
    </p>

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
      <div className="bg-zinc-950 border border-yellow-600/20 rounded-[2rem] p-8 hover:border-yellow-500 transition duration-300">
        <div className="text-5xl mb-6">🔍</div>

        <h3 className="text-2xl font-bold text-white mb-4">
          Valutazione iniziale
        </h3>

        <p className="text-gray-400 leading-7">
          Analizzo la tua storia, il tuo stato fisico e le tue esigenze
          attraverso test specifici e un confronto diretto. È il punto
          di partenza per capire davvero cosa ti serve.
        </p>
      </div>

      <div className="bg-zinc-950 border border-yellow-600/20 rounded-[2rem] p-8 hover:border-yellow-500 transition duration-300">
        <div className="text-5xl mb-6">🧍</div>

        <h3 className="text-2xl font-bold text-white mb-4">
          Analisi postura e movimento
        </h3>

        <p className="text-gray-400 leading-7">
          Valuto postura, mobilità e schemi motori per individuare
          compensi, rigidità e limitazioni che possono influenzare
          il benessere e le prestazioni quotidiane.
        </p>
      </div>

      <div className="bg-zinc-950 border border-yellow-600/20 rounded-[2rem] p-8 hover:border-yellow-500 transition duration-300">
        <div className="text-5xl mb-6">🎯</div>

        <h3 className="text-2xl font-bold text-white mb-4">
          Percorso personalizzato
        </h3>

        <p className="text-gray-400 leading-7">
          Costruisco un programma su misura, basato sui tuoi obiettivi
          reali e sostenibili. Ogni esercizio ha uno scopo preciso e
          segue un percorso di progressione chiaro.
        </p>
      </div>

      <div className="bg-zinc-950 border border-yellow-600/20 rounded-[2rem] p-8 hover:border-yellow-500 transition duration-300">
        <div className="text-5xl mb-6">📈</div>

        <h3 className="text-2xl font-bold text-white mb-4">
          Benessere e continuità
        </h3>

        <p className="text-gray-400 leading-7">
          Ti accompagno nel tempo monitorando i progressi e adattando
          il percorso quando necessario, per risultati concreti e duraturi.
        </p>
      </div>
    </div>

    <div className="mt-14">
      <a
        href="https://wa.me/393425620513?text=Ciao%20Fabio%2C%20vorrei%20prenotare%20una%20consulenza"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-full transition"
      >
        Prenota una consulenza gratuita
      </a>

      <p className="text-gray-400 mt-4">
        Scrivimi su WhatsApp e iniziamo insieme il tuo percorso.
      </p>
    </div>
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
