const express = require("express");
const fs = require("fs");
const dbUsers = "names.json";

const app = express();

const names = JSON.parse(fs.readFileSync(dbUsers, "utf-8"));

app.use((request, response, next) => {
  if (request.method === "GET") {
    console.log("I see you are using wrong method");
  } else if (request.method === "POST") {
    response.send("You are using right method");
    next();
  }
});

app.post("/", (request, response, next) => {
  if (request.headers.iknowyoursecret === "TheOwlsAreNotWhatTheySeem") {
    console.log("This is the right secret");
    next();
  } else {
    console.log("You have to know my secret");
    response.end();
  }
});

app.post("/", (request, response) => {
  const name = request.headers.username;
  const ip = request.connection.remoteAddress;

  console.log(`Your name is ${name}, your ip is ${ip}`);

  names.push({
    name: name,
    ip: ip,
  });

  fs.writeFile(dbUsers, JSON.stringify(names), (err) => {
    if (err) {
      throw err;
    }
  });

  response.end();
});

app.listen(8080, console.log(`Server listening on 8080`));
