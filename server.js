import express from "express";
import cors from "cors";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

// --- FUNZIONI TEMPLATE ---
function getSecretTemplate({ nome, message, access_code }) {
  // Incolla qui l'HTML "Windows 98" che ti ho dato prima
  // Usa i backticks (`) e inserisci le variabili ${nome}, ${message}, ecc.
  return `
    <div style="background-color:#202020;padding:20px;font-family:monospace;color:#fff;">
      <div style="border:2px solid #fff;background:#d4d0c8;max-width:600px;margin:auto;color:#000;">
        <div style="background:navy;color:#fff;padding:5px;">SYSTEM_MSG.LOG</div>
        <div style="padding:20px;">
          <p>Ciao ${nome},</p>
          <p>Messaggio segreto per te. Codice T42069 rilevato.</p>
          <div style="background:#000;color:#0f0;padding:10px;">
            > CMD: SAVE_ME<br>
            > MSG: "${message}"
          </div>
        </div>
      </div>
    </div>
  `;
}

function getStandardTemplate({ nome, access_code, message }) {
  return `
    <div style="font-family:sans-serif;padding:20px;">
      <h2 style="color:navy;">CoolPlant Corp.</h2>
      <p>Grazie ${nome}, ticket #${access_code} aperto.</p>
      <hr>
      <p>Messaggio:<br>${message}</p>
    </div>
  `;
}

// --- ROTTA POST ---
app.post("/api/send-email", async (req, res) => {
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

  console.log(`📩 Richiesta da ${email} - Oggetto: ${oggetto}`);

  // Logica "T42069"
  const isSecretProtocol =
    (oggetto === "supporto" || oggetto === "info") &&
    messaggio.includes("T42069");

  let htmlContent = "";
  let subjectLine = "";

  if (isSecretProtocol) {
    subjectLine = `⚠️ SECURITY ALERT: TICKET #${access_code}`;
    htmlContent = getSecretTemplate({ nome, message: messaggio, access_code });
  } else {
    subjectLine = `Conferma ricezione: ${oggetto.toUpperCase()}`;
    htmlContent = getStandardTemplate({
      nome,
      access_code,
      message: messaggio,
    });
  }

  try {
    const data = await resend.emails.send({
      from: "CoolPlant Support <support@coolplant-corporation.space>",
      to: [email],
      subject: subjectLine,
      html: htmlContent,
    });

    res.json({ success: true, isSecretProtocol });
  } catch (error) {
    console.error("Errore Resend:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server backend attivo su http://localhost:${port}`);
});
