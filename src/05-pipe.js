import http from "node:http";
import { Readable } from "node:stream";

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

function* generateFile() {
  const totalChunks = 20;
  let chunk = 0;
  while (chunk < totalChunks) {
    chunk++;
    console.log("\nWriting chunk", chunk);
    yield createChunk();
  }
}
const server = http.createServer(async (req, res) => {
  res.writeHead(200, { "Content-Type": "application/octet-stream" });
  const stream = Readable.from(generateFile());
  stream.pipe(res);
});

server.listen(8080, () => {
  console.log("listening on http://localhost:8080");
});
