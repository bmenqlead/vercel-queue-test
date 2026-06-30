import { send } from "@vercel/queue";

export default async function handler(req, res) {
  // Configura os cabeçalhos para permitir chamadas do navegador (CORS básico)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const testPayload = {
    message: "This is a test event from the API!",
    timestamp: Date.now(),
    source: "pure-nodejs-microservice"
  };

  try {
    console.log("[Producer API] Enqueueing event...");

    // Adiciona o evento na fila usando o método send global
    await send("test_queue", testPayload);

    return res.status(200).json({
      success: true,
      message: "Event successfully sent to Vercel Queues via API endpoint!",
      payload: testPayload
    });

  } catch (error) {
    console.error("[Producer API] Error sending to queue:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Failed to enqueue"
    });
  }
}
