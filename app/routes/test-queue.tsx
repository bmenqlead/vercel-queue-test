import { enqueue } from "@vercel/queue";

export const loader = async () => {
  const testPayload = {
    message: "This is a test event from the browser!",
    timestamp: Date.now(),
    source: "react-router-v7"
  };

  try {
    console.log("[Producer Route] Enqueueing event...");
    
    await enqueue("test_queue", testPayload);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Event successfully sent to Vercel Queues!",
      payload: testPayload
    }, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
    
  } catch (error: any) {
    console.error("[Producer Route] Error sending to queue:", error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || "Failed to enqueue"
    }, null, 2), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
