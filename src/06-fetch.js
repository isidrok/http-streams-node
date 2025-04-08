import fetch from "node-fetch";

fetch("http://localhost:8080").then((response) => {
  response.body.on("data", () => {
    console.log(`data`);
  });
  setTimeout(() => {
    console.log("pause");
    response.body.pause();
  }, 1000);
  setTimeout(() => {
    console.log("resume");
    response.body.resume();
  }, 20000);
});
