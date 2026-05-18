import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Metodo non consentito",
    });
  }

  try {

    const {
      nome,
      email,
      data,
      ora,
      servizio,
    } = req.body;

    const dataEmail = await resend.emails.send({

      from: "onboarding@resend.dev",

      to: email,

      subject: "Conferma prenotazione",

      html: `
        <h2>Prenotazione confermata</h2>

        <p>Ciao ${nome}</p>

        <p>Servizio: ${servizio}</p>

        <p>Data: ${data}</p>

        <p>Ora: ${ora}</p>
      `,
    });

    return res.status(200).json(dataEmail);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      error: error.message,
    });

  }

}