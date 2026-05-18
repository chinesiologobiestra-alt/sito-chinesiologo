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

    const response = await resend.emails.send({

      from: "Fabio Biestra <onboarding@resend.dev>",

      to: email,

      subject: "Conferma prenotazione",

      html: `
        <div style="font-family:Arial;padding:20px;">

          <h2>Conferma Prenotazione</h2>

          <p>Ciao ${nome},</p>

          <p>La tua prenotazione è stata confermata.</p>

          <hr />

          <p><strong>Servizio:</strong> ${servizio}</p>

          <p><strong>Data:</strong> ${data}</p>

          <p><strong>Ora:</strong> ${ora}</p>

          <br />

          <p>Fabio Biestra - Chinesiologo</p>

        </div>
      `,
    });

    return res.status(200).json(response);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      error,
    });

  }

}