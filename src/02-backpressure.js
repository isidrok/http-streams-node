import http from "node:http";

function createChunk() {
  const chunkSize = 20 * 1024 * 1024; // 20MB
  const chunkGenerationTime = 1000; // 1s
  return new Promise((resolve) => {
    setTimeout(
      resolve,
      chunkGenerationTime,
      new Uint8Array(new ArrayBuffer(chunkSize))
    );
  });
}

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { "Content-Type": "application/octet-stream" });
  let chunk = 0;
  const totalChunks = 20;
  while (chunk < totalChunks) {
    chunk++;
    console.log("\nWriting chunk", chunk);
    res.write(await createChunk());
  }
  res.end();
});

server.listen(8080, () => {
  console.log("listening on http://localhost:8080");
});
