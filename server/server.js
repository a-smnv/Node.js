const http = require("http");
// const url = require("url");
let names = [];
const port = 8080;
const fs = require("fs");
const dbName = "names.json";

const requestHandler = (request, response) => {
  names = JSON.parse(fs.readFileSync(dbName, "utf8"));

  if (request.method === "POST") {
    if (request.headers.iknowyoursecret === "TheOwlsAreNotWhatTheySeem") {
      names.push({
        name: request.headers.username,
        ip: request.connection.remoteAddress,
      });
      fs.writeFile(dbName, JSON.stringify(names), (err) => {
        if (err) {
          throw err;
        }
      });
      response.end(
        names.length
          ? `Hello, ${names.map((user) => `${user.name}`).join(", ")}`
          : "Hello"
      );
    } else {
      console.log("You don't know the secret!");
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
