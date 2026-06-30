import { handleCallback } from '@vercel/queue';

export default handleCallback(async (payload, metadata) => {
  const topic = metadata.topic || "test_queue";

  console.log(`[QueueConsumer API] Received event from queue: ${topic} (Message ID: ${metadata.messageId})`);
  console.log("[QueueConsumer API] Payload:", payload);

  try {
    // Simulate background processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`[QueueConsumer API] Successfully processed event ID: ${metadata.messageId}`);
    
  } catch (error) {
    console.error("[QueueConsumer API] Error processing queue event:", error);
    throw error; 
  }
});
