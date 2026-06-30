import { send } from "@vercel/queue";

export default async function handler(req, res) {
  // Configura os cabeçalhos para permitir chamadas do navegador (CORS básico)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Pega o corpo da requisição (se for POST do React Router)
  // Se não vier nada (ex: acesso direto pelo navegador), usa um payload padrão.
  let payloadDinamico = req.body;

  if (!payloadDinamico || Object.keys(payloadDinamico || {}).length === 0) {
    payloadDinamico = {
      message: "This is a fallback test event (No POST body provided)",
      timestamp: Date.now(),
      source: "pure-nodejs-microservice"
    };
  }

  try {
    console.log("[Producer API] Enqueueing event with payload:", payloadDinamico);

    // Adiciona o evento na fila passando o payload dinâmico
    await send("test_queue", payloadDinamico);

    return res.status(200).json({
      success: true,
      message: "Event successfully sent to Vercel Queues via API endpoint!",
      payload: payloadDinamico
    });

  } catch (error) {
    console.error("[Producer API] Error sending to queue:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Failed to enqueue"
    });
  }
}
