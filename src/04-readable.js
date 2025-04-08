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

const totalChunks = 20;
class CustomReadableStream extends Readable {
  constructor(opts) {
    super(opts);
    this._chunk = 0;
  }
  async _read() {
    while (this._chunk < totalChunks) {
      this._chunk++;
      console.log("\nWriting chunk", this._chunk);
      const canKeepWriting = this.push(await createChunk());
      if (!canKeepWriting) {
        return;
      }
    }
    this.push(null);
  }
}

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { "Content-Type": "application/octet-stream" });
  const stream = new CustomReadableStream();
  stream.on("data", (chunk) => {
    const canKeepWriting = res.write(chunk);
    if (!canKeepWriting) {
      stream.pause();
      res.once("drain", () => stream.resume());
    }
  });
  stream.on("end", () => res.end());
});

server.listen(8080, () => {
  console.log("listening on http://localhost:8080");
});
