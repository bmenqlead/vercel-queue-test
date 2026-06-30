import { handleCallback } from '@vercel/queue';

export const config = {
  runtime: 'edge',
};

export default handleCallback(async (payload, metadata) => {
  const topic = metadata.topic || "test_queue";

  console.log(`[QueueWorker API] Received event from queue: ${topic} (Message ID: ${metadata.messageId})`);
  console.log("[QueueWorker API] Payload:", payload);

  try {
    // Simulate background processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`[QueueWorker API] Successfully processed event ID: ${metadata.messageId}`);
    
  } catch (error) {
    console.error("[QueueWorker API] Error processing queue event:", error);
    throw error; 
  }
});
