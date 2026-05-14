import './index.css'

export default function App() {
  return (
    <div>
      <section className="hero">
        <h1>Studio Chinesiologico Premium</h1>

        <p>
          Benessere, recupero funzionale e percorsi personalizzati
          con prenotazione online e gestione professionale completa.
        </p>

        <button className="gold-btn">
          Prenota Ora
        </button>
      </section>

      <section className="section">
        <div className="container">
          <h2>Prenotazioni Online</h2>

          <div className="services">
            <div className="card">
              <h3>Valutazione Posturale</h3>
              <button className="gold-btn">Prenota</button>
            </div>

            <div className="card">
              <h3>Recupero Funzionale</h3>
              <button className="gold-btn">Prenota</button>
            </div>

            <div className="card">
              <h3>Allenamento Personalizzato</h3>
              <button className="gold-btn">Prenota</button>
            </div>
          </div>

          <div className="calendar">
            <h2>Calendario</h2>

            <div className="calendar-grid">
              {[1,2,3,4,5,6,7,8,9,10].map(day => (
                <button key={day}>{day}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section reviews">
        <div className="container">
          <h2>Recensioni</h2>

          <div className="review-card">
            <h3>★★★★★</h3>
            <p>
              Professionalità incredibile.
              Dopo poche sedute ho migliorato postura e mobilità.
            </p>
          </div>

          <div className="review-card">
            <h3>★★★★★</h3>
            <p>
              Ambiente professionale e percorso personalizzato davvero efficace.
            </p>
          </div>
        </div>
      </section>

      <section className="section admin">
        <div className="container">
          <h2>Admin Dashboard</h2>

          <div className="card">
            <p>Paziente: Mario Rossi</p>
            <p>Servizio: Valutazione Posturale</p>
            <p>Orario: 10:30</p>

            <button className="gold-btn">
              Gestisci
            </button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <h2>Studio Chinesiologico</h2>
        <p>© 2026 Tutti i diritti riservati</p>
      </footer>
    </div>
  )
}