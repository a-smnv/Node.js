const http = require("http");
const url = require("url");
const port = 8080;

const requestHandler = (request, response) => {
  let urlRequest = url.parse(request.url, true);
  const name = urlRequest.query.name;
  console.log(name, true);
  if (request.method == "GET") {
    if (name == "Stacy") {
      response.end(`Hello from America`);
    }
    if (name == "Olga") {
      response.end(`Hello from Russia`);
    }
  }
  if (request.method == "POST") {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      console.log(body);
      response.end("ok");
    });
  }
};
const server = http.createServer(requestHandler);
server.listen(port, (err) => {
  if (err) {
    return console.log("The exception happened:", err);
  }
  console.log(`Server listening on ${port}`);
});
