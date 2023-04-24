const server = Bun.serve({
  port: 3050,
  fetch(req) {
    return new Response(`Bun!`);
  },
});
