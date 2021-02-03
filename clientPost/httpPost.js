const http = require("http");

const options = {
  host: "localhost",
  path: "/token",
  port: "8080",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
const data = { username: "Vlad", password: "135" };
// в базе еще есть Anastasia 123
callback = function (response) {
  var str = "";
  response.on("data", function (chunk) {
    str += chunk;
  });

  response.on("end", function () {
    console.log(str);
  });
};

var req = http.request(options, callback);

req.write(JSON.stringify(data));
req.end();

// const http = require("http");

// const options = {
//   path: "/token",
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
// };

// const data = { username: "Anastasia", password: "123" };

// const request = http.request("http://localhost:8080/", options, (response) => {
//   let str = "";

//   response.on("data", (d) => {
//     str += d;
//   });

//   response.on("end", () => {
//     console.log(str);
//   });
// });

// request.write(JSON.stringify(data));
// request.end();
