import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import jsPDF from 'jspdf'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export default function App() {

  const [bookings, setBookings] = useState([])

  const [patient, setPatient] = useState('')
  const [patientEmail, setPatientEmail] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const [session, setSession] = useState(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [selectedDate, setSelectedDate] = useState(new Date())

  const services = [
    'Valutazione Posturale',
    'Recupero Funzionale',
    'Allenamento Personalizzato'
  ]

  useEffect(() => {

    loadBookings()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()

  }, [])

  async function loadBookings() {

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.log(error)
      return
    }

    setBookings(data)
  }

  async function signIn() {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    }
  }

  async function logout() {
    await supabase.auth.signOut()
  }

  function isTimeBooked(selectedDate, selectedTime) {

    return bookings.some(
      (booking) =>
        booking.booking_date === selectedDate &&
        booking.booking_time === selectedTime
    )
  }

  function getBookingsForDate(date) {

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    const formattedDate = `${year}-${month}-${day}`

    return bookings.filter(
      (booking) => booking.booking_date === formattedDate
    )
  }

  function tileClassName({ date, view }) {

    if (view === 'month') {

      const dayBookings = getBookingsForDate(date)

      if (dayBookings.length > 0) {
        return 'fully-booked'
      }
    }

    return null
  }

  async function book(service) {

    if (!patient || !patientEmail || !date || !time) {
      alert('Compila tutti i campi')
      return
    }

    if (isTimeBooked(date, time)) {
      alert('Orario già prenotato')
      return
    }

    const booking = {
      patient,
      patient_email: patientEmail,
      service,
      booking_date: date,
      booking_time: time,
    }

    const { error } = await supabase
      .from('bookings')
      .insert([booking])

    if (error) {
      console.log(error)
      alert('Errore prenotazione')
      return
    }

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Studio Premium <onboarding@resend.dev>',
        to: patientEmail,
        subject: 'Prenotazione Confermata',
        html: `
          <div style="font-family: Arial; padding:20px;">
            <h1 style="color:#eab308;">
              Prenotazione Confermata
            </h1>

            <p>Ciao ${patient},</p>

            <p>
              La tua prenotazione è stata confermata con successo.
            </p>

            <hr />

            <p><b>Servizio:</b> ${service}</p>
            <p><b>Data:</b> ${date}</p>
            <p><b>Orario:</b> ${time}</p>

            <hr />

            <p>
              Studio Chinesiologico Premium
            </p>
          </div>
        `,
      }),
    })

    alert('Prenotazione salvata!')

    loadBookings()

    setPatient('')
    setPatientEmail('')
    setDate('')
    setTime('')
  }

  async function deleteBooking(id) {

    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id)

    if (error) {
      console.log(error)
      alert('Errore eliminazione')
      return
    }

    loadBookings()
  }

  function downloadPDF(booking) {

    const doc = new jsPDF()

    doc.setFontSize(22)
    doc.text('Studio Chinesiologico Premium', 20, 30)

    doc.setFontSize(14)

    doc.text(`Paziente: ${booking.patient}`, 20, 60)
    doc.text(`Servizio: ${booking.service}`, 20, 80)
    doc.text(`Data: ${booking.booking_date}`, 20, 100)
    doc.text(`Orario: ${booking.booking_time}`, 20, 120)

    doc.save(`prenotazione-${booking.patient}.pdf`)
  }

  return (

    <div className="min-h-screen bg-black text-white">

      <section className="py-24 px-6 text-center">

        <h1 className="text-6xl font-bold text-yellow-500 mb-6">
          Studio Chinesiologico Premium
        </h1>

        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Benessere, recupero funzionale e percorsi personalizzati con
          prenotazione online professionale.
        </p>

      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <h2 className="text-4xl font-bold text-yellow-500 mb-10">
          Prenotazioni Online
        </h2>

        <div className="grid md:grid-cols-4 gap-5 mb-12">

          <input
            type="text"
            placeholder="Nome paziente"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="email"
            placeholder="Email paziente"
            value={patientEmail}
            onChange={(e) => setPatientEmail(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 outline-none"
          />

          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 outline-none"
          >

            <option value="">
              Seleziona orario
            </option>

            {[
              '09:00',
              '09:30',
              '10:00',
              '10:30',
              '11:00',
              '11:30',
              '12:00',
              '12:30',
              '13:00',
              '13:30',
              '14:00',
              '14:30',
              '15:00',
              '15:30',
              '16:00',
              '16:30',
              '17:00',
              '17:30',
              '18:00',
              '18:30',
            ]
              .filter((slot) => !isTimeBooked(date, slot))
              .map((slot) => (

                <option key={slot} value={slot}>
                  {slot}
                </option>

              ))}

          </select>

        </div>

        {date && (

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-12">

            <h3 className="text-xl font-bold text-yellow-500 mb-4">
              Orari Occupati
            </h3>

            <div className="flex flex-wrap gap-3">

              {bookings
                .filter((booking) => booking.booking_date === date)
                .map((booking) => (

                  <div
                    key={booking.id}
                    className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded-xl"
                  >
                    {booking.booking_time}
                  </div>

                ))}

              {bookings.filter((booking) => booking.booking_date === date).length === 0 && (

                <div className="text-green-400">
                  Nessun orario occupato
                </div>

              )}

            </div>

          </div>

        )}

        <div className="space-y-6">

          {services.map((service) => (

            <div
              key={service}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex justify-between items-center"
            >

              <div>

                <h3 className="text-2xl font-semibold mb-2">
                  {service}
                </h3>

                <p className="text-gray-400">
                  Percorso professionale personalizzato
                </p>

              </div>

              <button
                onClick={() => book(service)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-2xl font-bold transition"
              >
                Prenota
              </button>

            </div>

          ))}

        </div>

      </section>

      <section className="bg-zinc-900 py-24 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-yellow-500 mb-12 text-center">
            Calendario Appuntamenti
          </h2>

          <div className="bg-black rounded-3xl p-10 flex justify-center">

            <Calendar
              onChange={(value) => {

                setSelectedDate(value)

                const year = value.getFullYear()
                const month = String(value.getMonth() + 1).padStart(2, '0')
                const day = String(value.getDate()).padStart(2, '0')

                const formatted = `${year}-${month}-${day}`

                setDate(formatted)
              }}
              value={selectedDate}
              tileClassName={tileClassName}
              className="rounded-3xl border-none p-6"
            />

          </div>

          <div className="mt-10 text-center text-gray-300 text-xl">

            Giorno selezionato:

            <span className="text-yellow-500 font-bold ml-3">
              {selectedDate.toLocaleDateString()}
            </span>

          </div>

        </div>

      </section>

      <section className="bg-zinc-950 py-24 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-yellow-500 mb-12 text-center">
            Recensioni
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

              <div className="text-yellow-500 text-2xl mb-4">
                ★★★★★
              </div>

              <p className="text-gray-300 mb-6">
                Professionalità incredibile.
                Dopo poche sedute ho migliorato postura e mobilità.
              </p>

              <div className="text-yellow-500 font-semibold">
                Marco R.
              </div>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

              <div className="text-yellow-500 text-2xl mb-4">
                ★★★★★
              </div>

              <p className="text-gray-300 mb-6">
                Ambiente professionale e percorso personalizzato davvero efficace.
              </p>

              <div className="text-yellow-500 font-semibold">
                Laura B.
              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="bg-white text-black py-24 px-6">

        <div className="max-w-6xl mx-auto">

          {!session && (

            <div className="bg-zinc-100 rounded-3xl p-8 mb-10">

              <h3 className="text-2xl font-bold mb-6">
                Login Admin
              </h3>

              <div className="grid md:grid-cols-3 gap-4">

                <input
                  type="email"
                  placeholder="Email admin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-2xl px-5 py-4"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded-2xl px-5 py-4"
                />

                <button
                  onClick={signIn}
                  className="bg-yellow-500 hover:bg-yellow-600 rounded-2xl font-bold"
                >
                  Login
                </button>

              </div>

            </div>

          )}

          {session && (

            <>

              <div className="flex justify-between items-center mb-10">

                <div>

                  <h2 className="text-4xl font-bold">
                    Admin Dashboard
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Totale prenotazioni: {bookings.length}
                  </p>

                  <button
                    onClick={logout}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
                  >
                    Logout
                  </button>

                </div>

              </div>

              <div className="bg-zinc-100 rounded-3xl p-8 shadow-lg">

                {bookings.length === 0 ? (

                  <div className="text-center text-gray-500 py-10">
                    Nessuna prenotazione presente
                  </div>

                ) : (

                  <div className="space-y-5">

                    {bookings.map((booking) => (

                      <div
                        key={booking.id}
                        className="bg-white rounded-2xl p-6 border flex justify-between items-center"
                      >

                        <div>

                          <h3 className="text-xl font-bold">
                            {booking.patient}
                          </h3>

                          <p className="text-gray-500 mt-1">
                            {booking.service}
                          </p>

                          <p className="text-sm text-gray-400 mt-1">
                            {booking.booking_date} • {booking.booking_time}
                          </p>

                        </div>

                        <div className="flex gap-3">

                          <button
                            onClick={() => downloadPDF(booking)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-3 rounded-xl font-bold transition"
                          >
                            PDF
                          </button>

                          <button
                            onClick={() => deleteBooking(booking.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-bold transition"
                          >
                            Elimina
                          </button>

                        </div>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            </>

          )}

        </div>

      </section>

    </div>

  )
}