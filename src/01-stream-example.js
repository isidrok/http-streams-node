import http from "node:http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  setImmediate(() => {
    res.write("Hello");
    setImmediate(() => {
      res.write("World");
      res.end();
    });
  });
});

server.listen(8080, () => {
  console.log("listening on http://localhost:8080");
});
