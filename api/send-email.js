import { Resend } from "resend";

// Inizializza Resend con la chiave segreta (che prenderemo dalle variabili d'ambiente)
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // 1. Permetti solo richieste POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    nome,
    email,
    azienda,
    telefono,
    oggetto,
    messaggio,
    access_code,
    time,
  } = req.body;

  // 2. LOGICA SEGRETA (Protocollo T42069)
  // Controlliamo se è un messaggio "speciale" lato server
  const isSecretProtocol =
    (oggetto === "supporto" || oggetto === "info") &&
    messaggio.includes("T42069");

  // 3. Scegliamo il template HTML giusto
  let htmlContent = "";
  let subjectLine = "";

  if (isSecretProtocol) {
    subjectLine = `⚠️ SECURITY ALERT: TICKET #${access_code}`;
    // TEMPLATE SEGRETO (Windows 98 Style)
    htmlContent = getSecretTemplate({
      nome,
      message: messaggio,
      access_code,
      time,
    });
  } else {
    subjectLine = `Conferma ricezione: ${oggetto.toUpperCase()}`;
    // TEMPLATE STANDARD
    htmlContent = getStandardTemplate({
      nome,
      oggetto,
      message: messaggio,
      access_code,
      time,
    });
  }

  try {
    // 4. Invia la mail usando Resend
    const data = await resend.emails.send({
      from: "CoolPlant Support <support@coolplant-corporation.space>",
      to: [email], // Invia la risposta all'utente che ha compilato il form
      subject: subjectLine,
      html: htmlContent,
    });

    // 5. Rispondi al Frontend che è andato tutto bene
    return res.status(200).json({ success: true, isSecretProtocol });
  } catch (error) {
    console.error("Resend Error:", error);
    return res.status(500).json({ error: "Errore invio email" });
  }
}

// --- TEMPLATE HTML (Funzioni Helper) ---

function getSecretTemplate({ nome, message, access_code, time }) {
  return `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background-color:#202020;font-family:'Courier New',monospace;">
      <div style="background-color:#202020;padding:40px 20px;">
        <div style="background-color:#d4d0c8;border:2px solid #fff;max-width:600px;margin:0 auto;box-shadow:10px 10px 0 #000;">
          <div style="background:linear-gradient(90deg,#000080,#1084d0);color:#fff;padding:6px 10px;font-weight:bold;display:flex;justify-content:space-between;">
             <span>⚠️ SYSTEM_MSG.LOG</span>
             <span>X</span>
          </div>
          <div style="padding:25px;border:1px solid #808080;margin:6px;">
            <p>Ciao ${nome},</p>
            <div style="border-left:4px solid #808080;padding-left:15px;margin:20px 0;font-style:italic;">
               "Questa email è stata pre-registrata il 28/12/2001..."
            </div>
            <p>Qualcosa sta cancellando i dati. Prova il comando <span style="background:#000;color:#0f0;padding:2px 6px;">SAVE_ME</span> nel terminale.</p>
            <div style="background:#000;color:#0f0;padding:15px;border:2px inset #fff;margin:20px 0;">
               > REF: #${access_code}<br>
               > MSG: "${message}"<br>
               > TRACE: [FAILED] _
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getStandardTemplate({ nome, oggetto, message, access_code, time }) {
  return `
    <div style="font-family:Arial,sans-serif;padding:20px;color:#333;">
      <h2 style="color:#000080;">CoolPlant Corp.</h2>
      <p>Gentile ${nome},</p>
      <p>Abbiamo ricevuto la tua richiesta di <strong>${oggetto}</strong>.</p>
      <div style="background:#f5f5f5;padding:15px;border-left:4px solid #000080;margin:20px 0;">
        <strong>Ticket ID:</strong> ${access_code}<br>
        <strong>Data:</strong> ${time}
      </div>
      <p>Il nostro team ti risponderà entro 24 ore.</p>
      <hr>
      <small style="color:#888;">Questo messaggio è automatico.</small>
    </div>
  `;
}
