export const loader = () => {
  return new Response(JSON.stringify({ message: "Hello World!" }, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
