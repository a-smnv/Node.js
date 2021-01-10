const http = require("http");
const url = require("url");
const names = [];
const port = 8080;
const fs = require("fs");
const dbName = "names.json";

if (fs.existsSync(dbName)) {
  names = JSON.parse(fs.readFileSync(dbName, "utf8"));
  console.log(">>> names read from file:", names);
}

const requestHandler = (request, response) => {
  let urlRequest = url.parse(request.url, true);
  const name = urlRequest.query.name;
  console.log(name, true);
  if (request.method == "GET") {
    // if (name == "Stacy") {
    //   response.end(`Hello from America`);
    // }
    // if (name == "Olga") {
    //   response.end(`Hello from Russia`);
    // }
    if (name) {
      names.push(name);
      fs.writeFile(dbName, JSON.stringify(names), (err) => {
        if (err) {
          throw err;
        }
      });
    }
    response.end(`Hello, ${names.join(",")}!`);
  }

  var targetHeader = request.headers.iknowoursecret;
  if (request.method == "POST") {
    console.log(request.metod);
    if (targetHeader != null) {
      console.log(targetHeader);
      let body = "";
      request.on("data", (chunk) => {
        body += chunk.toString();
      });
      request.on("end", () => {
        console.log(body);
        response.end("TheOwlsAreNotWhatTheySeem");
      });
    }
  }
};
const server = http.createServer(requestHandler);
server.listen(port, (err) => {
  if (err) {
    return console.log("The exception happened:", err);
  }
  console.log(`Server listening on ${port}`);
});
