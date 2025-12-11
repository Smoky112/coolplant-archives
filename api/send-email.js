import { Resend } from "resend";

// Inizializza Resend con la chiave segreta
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

  // --- MODIFICA FONDAMENTALE ---
  // Normalizziamo SIA l'oggetto CHE il messaggio per i controlli (case insensitive)
  const subjectLower = oggetto ? oggetto.toLowerCase() : "";
  const messageLower = messaggio ? messaggio.toLowerCase() : "";

  // 2. DEFINIZIONE PROTOCOLLI
  
  // Protocollo Troll: si attiva se la frase è nell'OGGETTO *OPPURE* nel MESSAGGIO
  const isTrollProtocol = 
    subjectLower.includes("suca alessia") || 
    messageLower.includes("suca alessia");

  // Protocollo Segreto: si attiva su oggetti specifici + codice nel messaggio
  const isSecretProtocol =
    (subjectLower === "supporto" || subjectLower === "info") &&
    messageLower.includes("t42069"); // Uso messageLower per sicurezza

  // 3. SELEZIONE DEL TEMPLATE
  let htmlContent = "";
  let subjectLine = "";

  if (isTrollProtocol) {
    // --- RAMO TROLL (BSOD) ---
    subjectLine = `🚫 FATAL ERROR: 0x000000SUCA`;
    htmlContent = getTrollTemplate({
      nome,
      access_code,
    });
  } else if (isSecretProtocol) {
    // --- RAMO SEGRETO (Win98) ---
    subjectLine = `⚠️ SECURITY ALERT: TICKET #${access_code}`;
    htmlContent = getSecretTemplate({
      nome,
      message: messaggio,
      access_code,
      time,
      from_name: email, 
      subject_type: oggetto,
    });
  } else {
    // --- RAMO STANDARD ---
    subjectLine = `Conferma ricezione: ${oggetto ? oggetto.toUpperCase() : 'RICHIESTA'}`;
    htmlContent = getStandardTemplate({
      nome,
      oggetto,
      access_code,
      time,
    });
  }

  try {
    // 4. Invia la mail usando Resend
    const data = await resend.emails.send({
      from: "CoolPlant Support <support@coolplant-corporation.space>",
      to: [email], // Rispondi all'utente
      subject: subjectLine,
      html: htmlContent,
    });

    // 5. Rispondi al Frontend
    return res.status(200).json({ 
      success: true, 
      isSecretProtocol, 
      isTrollProtocol 
    });

  } catch (error) {
    console.error("Resend Error:", error);
    return res.status(500).json({ error: "Errore invio email" });
  }
}


// ==========================================
//           TEMPLATE HTML HELPER
// ==========================================

// 1. TEMPLATE TROLL (Blue Screen of Death)
function getTrollTemplate({ nome, access_code }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #0000AA; font-family: 'Courier New', Courier, monospace; color: #FFFFFF;">
      
      <div style="padding: 40px 20px; text-align: left;">
        
        <!-- Header Windows -->
        <p style="background-color: #AAAAAA; color: #0000AA; display: inline-block; padding: 2px 5px; font-weight: bold; margin-bottom: 20px;">
          Windows
        </p>

        <h1 style="font-size: 24px; font-weight: normal; margin-bottom: 30px; line-height: 1.4; text-shadow: 2px 2px #000;">
          A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) +
          00010E36. The current application will be terminated.
        </h1>

        <div style="border: 2px solid #FFFFFF; padding: 20px; margin-bottom: 30px;">
          <p style="font-size: 18px; margin-top: 0; color: #FFFF00; font-weight: bold;">
            ⚠️ ILLEGAL_OPERATION_DETECTED
          </p>
          <p style="font-size: 14px; line-height: 1.5;">
            L'utente <strong>${nome || 'UNKNOWN'}</strong> ha tentato di eseguire un'operazione non consentita: <br><br>
            <span style="background-color: #FFFFFF; color: #0000AA; padding: 2px 5px; font-weight: bold;">"INSULTARE_ALESSIA.EXE"</span>
          </p>
          <p style="font-size: 14px; line-height: 1.5;">
            Il sistema ha rifiutato la richiesta e ha avviato il protocollo di autodistruzione del karma.
          </p>
        </div>

        <p style="margin-bottom: 10px; font-size: 14px;">
          * Press any key to chiedere scusa.<br>
          * Press CTRL+ALT+DEL to formattare il tuo rispetto.<br>
          * Non spegnere il computer, stiamo tracciando il tuo IP.
        </p>

        <br>
        
        <p style="text-align: center; font-size: 12px; margin-top: 40px; opacity: 0.7;">
          Technical Information:<br>
          *** STOP: 0x00000050 (0xFD3094C2, 0x00000001, 0xFBFE7617, 0x00000000)<br>
          *** TICKET_ID: ${access_code} (BANNED)
        </p>

      </div>
    </body>
    </html>
  `;
}

// 2. TEMPLATE SEGRETO (Windows 98)
function getSecretTemplate({ nome, message, access_code, time, from_name, subject_type }) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  @media only screen and (max-width: 600px) {
    .container-outer { padding: 10px !important; }
    .window-frame { width: 100% !important; margin: 0 !important; box-shadow: 5px 5px 0px rgba(0,0,0,0.5) !important; }
    .content-inner { padding: 10px !important; }
    .header-table td { display: block !important; width: 100% !important; padding-bottom: 5px !important; }
    .header-label { border-bottom: none !important; color: #888 !important; font-size: 11px !important; }
    .header-value { border-bottom: 1px dotted #ccc !important; padding-bottom: 10px !important; margin-bottom: 10px !important; }
  }
</style>
</head>
<body style="margin: 0; padding: 0; background-color: #202020;">

<div class="container-outer" style="background-color: #202020; padding: 40px 20px; font-family: 'Courier New', Courier, monospace; font-size: 14px; color: #000;">
  
  <div class="window-frame" style="background-color: #d4d0c8; border: 2px solid #ffffff; border-right-color: #404040; border-bottom-color: #404040; max-width: 600px; margin: 0 auto; box-shadow: 10px 10px 0px rgba(0,0,0,0.5);">
    
    <!-- Barra del Titolo -->
    <div style="background: linear-gradient(90deg, #000080, #1084d0); color: white; padding: 8px 10px; font-weight: bold; font-size: 13px; letter-spacing: 1px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000;">
      <span style="text-shadow: 1px 1px #000; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">⚠ SYSTEM_MSG.LOG</span>
      <div style="display: flex; gap: 4px; flex-shrink: 0;">
         <span style="border: 1px solid #fff; border-right-color: #404040; border-bottom-color: #404040; padding: 0 6px; font-size: 12px; background: #c0c0c0; color: #000; font-weight: bold; cursor: default;">_</span>
         <span style="border: 1px solid #fff; border-right-color: #404040; border-bottom-color: #404040; padding: 0 6px; font-size: 12px; background: #c0c0c0; color: #000; font-weight: bold; cursor: default;">X</span>
      </div>
    </div>

    <!-- Contenuto -->
    <div class="content-inner" style="padding: 25px; border: 1px solid #808080; margin: 6px;">
      
      <div style="background-color: #fff; border: 1px inset #808080; padding: 15px; margin-bottom: 25px; box-shadow: inset 1px 1px 2px #ccc;">
        <table class="header-table" width="100%" cellpadding="4" cellspacing="0" style="font-family: 'Courier New', Courier, monospace; font-size: 13px;">
          <tr>
            <td class="header-label" width="90" style="font-weight: bold; color: #444; border-bottom: 1px dotted #ccc; vertical-align: top;">MITTENTE:</td>
            <td class="header-value" style="color: #000080; border-bottom: 1px dotted #ccc;">[UNKNOWN] @ CoolPlant</td>
          </tr>
          <tr>
            <td class="header-label" style="font-weight: bold; color: #444; border-bottom: 1px dotted #ccc; vertical-align: top;">A:</td>
            <td class="header-value" style="border-bottom: 1px dotted #ccc; word-break: break-all;">${from_name || 'Utente'}</td>
          </tr>
          <tr>
            <td class="header-label" style="font-weight: bold; color: #444; border-bottom: 1px dotted #ccc; vertical-align: top;">DATA:</td>
            <td class="header-value" style="border-bottom: 1px dotted #ccc;">28/12/2001 [DELAYED]</td>
          </tr>
          <tr>
            <td class="header-label" style="font-weight: bold; color: #444; vertical-align: top;">OGGETTO:</td>
            <td class="header-value" style="font-weight: bold; color: #800000;">RE: ${subject_type || 'Unknown'}</td>
          </tr>
        </table>
      </div>

      <div style="margin-bottom: 25px; line-height: 1.6; color: #222; font-size: 14px;">
        <p style="margin-bottom: 15px;">Ciao sono Tagliaferri Lorenzo,</p>
        
        <div style="border-left: 4px solid #808080; padding-left: 15px; margin-bottom: 20px; font-style: italic; color: #444;">
          "Questa email è stata pre-registrata in data <strong style="background-color: #ffffcc; padding: 0 3px;">28/12/2001</strong> e lasciata segreta fino ad ora."
        </div>

        <p style="margin-bottom: 15px;">
          Non so ancora di preciso cosa sia successo ma qualcosa di pesante sta per uscire a galla, o almeno lo spero.
        </p>

        <p style="margin-bottom: 20px;">
          I servizi fino ad oggi sono ancora disponibili ma non credo che durino ancora molto. Non so bene chi sia, ma sta <strong style="color: #b00000;">eliminando pian piano i dati</strong> dopo la morte di Davide.
        </p>
        
        <p style="margin-bottom: 20px;">
          Se sei qui per capire cos'è successo prova a inviare il comando <span style="display: inline-block; background-color: #000; color: #0f0; padding: 2px 6px; font-family: 'Lucida Console', monospace; font-weight: bold;">CENERI-DEL-SE**U*U</span> nel terminale sperando che ancora funzioni... buona fortuna.
        </p>

        <div style="border-top: 1px dashed #808080; border-bottom: 1px dashed #808080; padding: 10px 0; margin: 20px 0; text-align: center; background-color: #e8e8e8;">
          <span style="font-weight: bold; display: inline-block;">STATO SERVER:</span> 
          <span style="color: #cc0000; font-weight: bold; text-decoration: blink;">OFFLINE</span> 
          <span style="font-size: 11px; color: #666; display: block;">[CONNECTION_LOST]</span>
        </div>
        
        <div style="background-color: #000; color: #00ff00; padding: 15px; border: 2px inset #ffffff; font-family: 'Lucida Console', Monaco, monospace; font-size: 12px; margin: 20px 0; box-shadow: 2px 2px 4px rgba(0,0,0,0.3); overflow-x: auto;">
          <div style="min-width: 200px;">
            > SYSTEM_DIAGNOSTIC...<br>
            > TICKET_REF: #${access_code}<br>
            > MSG_PREVIEW: "${message ? message.substring(0, 20) : ''}..."<br>
            > TRACING... [FAILED]<br>
            > _<span style="animation: blink 1s step-end infinite;">█</span>
          </div>
        </div>

        <p style="font-size: 12px; color: #555;">
          Un operatore esaminerà la richiesta entro 24 cicli di sistema.
        </p>
      </div>

      <div style="background-color: #d4d0c8; border-top: 2px groove #fff; padding-top: 15px; font-size: 11px; color: #666; text-align: center;">
        <p style="margin: 3px 0;">COOLPLANT CORPORATION</p>
        <p style="margin: 3px 0;">Piazza della Vittoria, Brescia - IT</p>
        <p style="margin: 10px 0 0 0; color: #999;">*** AUTOMATED MSG ***</p>
      </div>

    </div>
  </div>
  
  <div style="text-align: center; margin-top: 20px; color: #666; font-size: 11px; font-family: sans-serif;">
    &copy; 1998-2001 CoolPlant Corp. <br>
    <span style="color: #444;">ID: ${access_code}</span>
  </div>
</div>

</body>
</html>
  `;
}

// 3. TEMPLATE STANDARD
function getStandardTemplate({ nome, oggetto, access_code, time }) {
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
