export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {

    const { patient, email, service, date, time } = req.body

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Studio Chinesiologico <onboarding@resend.dev>',
        to: email,
        subject: 'Prenotazione Confermata',
        html: `
          <h1>Prenotazione Confermata</h1>
          <p>Ciao ${patient}</p>
          <p>Servizio: ${service}</p>
          <p>Data: ${date}</p>
          <p>Orario: ${time}</p>
        `,
      }),
    })

    const data = await response.json()

    return res.status(200).json(data)

  } catch (error) {

    return res.status(500).json({
      error: error.message,
    })
  }
}