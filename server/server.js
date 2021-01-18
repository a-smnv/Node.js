const express = require("express");
// const fs = require("fs");
// const dbName = "names.json";
// const names = [];
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use((request, response, next) => {
  if (request.method === "GET") {
    console.log("I see you are using wrong method");
  } else if (request.method === "POST") {
    console.log("You are using right method");
  }
  console.log(">>>", request.body);
  next();
});

app.post("/", (request, response, next) => {
  console.log("The route / has been detected");
  response.end("Alright");
});

app.post("/specific", (request, response, next) => {
  console.log("The route /specific has been detected");
  response.end("Alright");
});
//   names = JSON.parse(fs.readFileSync(dbName, "utf8"));

//   if (request.method === "POST") {
//     if (request.headers.iknowyoursecret === "TheOwlsAreNotWhatTheySeem") {
//       names.push({
//         name: request.headers.username,
//         ip: request.connection.remoteAddress,
//       });
//       fs.writeFile(dbName, JSON.stringify(names), (err) => {
//         if (err) {
//           throw err;
//         }
//       });
//       response.end(
//         names.length
//           ? `Hello, ${names.map((user) => `${user.name}`).join(", ")}`
//           : "Hello"
//       );
//     } else {
//       console.log("You don't know the secret!");
//     }
//   }
// };

app.listen(8080, console.log(`Server listening on 8080`));
