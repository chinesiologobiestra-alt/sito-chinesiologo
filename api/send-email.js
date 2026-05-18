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

  from: "Fabio Biestra <info@fabiobiestrachinesiologo.it>",

     to: email,

      subject: "Conferma prenotazione",

      html: `

<div style="
  font-family: Arial, sans-serif;
  background:#f7f5f2;
  padding:40px;
  color:#222;
">

  <div style="
    max-width:600px;
    margin:auto;
    background:white;
    border-radius:18px;
    overflow:hidden;
    box-shadow:0 10px 30px rgba(0,0,0,0.08);
  ">

    <div style="
      background:#0b0b0b;
      padding:35px;
      text-align:center;
      border-bottom:3px solid #d4af37;
    ">

      <h1 style="
        color:#d4af37;
        margin:0;
        font-size:34px;
        letter-spacing:2px;
      ">
        FABIO BIESTRA
      </h1>

      <p style="
        color:white;
        margin-top:10px;
        font-size:15px;
        letter-spacing:3px;
      ">
        CHINESIOLOGO
      </p>

    </div>

    <div style="padding:40px;">

      <h2 style="
        color:#d4af37;
        margin-bottom:25px;
      ">
        Conferma Prenotazione
      </h2>

      <p style="
        font-size:16px;
        line-height:1.8;
      ">
        Ciao <strong>${nome}</strong>,
      </p>

      <p style="
        font-size:16px;
        line-height:1.8;
      ">
        la tua prenotazione è stata confermata con successo.
        Sarò felice di accompagnarti nel tuo percorso
        orientato al benessere, al movimento e alla qualità della vita.
      </p>

      <div style="
        background:#f7f5f2;
        border-left:4px solid #d4af37;
        padding:25px;
        border-radius:12px;
        margin:35px 0;
      ">

        <p><strong>Servizio:</strong> ${servizio}</p>

        <p><strong>Data:</strong> ${data}</p>

        <p><strong>Orario:</strong> ${ora}</p>

      </div>

      <p style="
        font-size:15px;
        line-height:1.8;
      ">
        Ti consiglio di presentarti qualche minuto prima
        dell’orario stabilito.
      </p>

      <p style="
        font-size:15px;
        line-height:1.8;
      ">
        Per eventuali modifiche o necessità,
        potrai contattarmi direttamente rispondendo a questa email.
      </p>

      <div style="
        margin-top:45px;
        padding-top:25px;
        border-top:1px solid #e5e5e5;
      ">

        <p style="
          margin:0;
          font-weight:bold;
          font-size:18px;
        ">
          Fabio Biestra
        </p>

        <p style="
          color:#777;
          margin-top:6px;
        ">
          Chinesiologo
        </p>

      </div>

    </div>

  </div>

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