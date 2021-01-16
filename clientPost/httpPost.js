const http = require("http");

const options = {
  host: "localhost",
  path: "/",
  port: "8080",
  method: "POST",
  headers: {
    username: "Anastasia",
    iknowyoursecret: "TheOwlsAreNotWhatTheySeem",
  },
};

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
req.write("hello world!");
req.end();
