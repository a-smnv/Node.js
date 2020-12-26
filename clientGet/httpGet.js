const http = require("http");

const options = {
  host: "localhost",
  path: "/?name=Olga",
  port: "8080",
  headers: { custom: "Custom Header Demo works" },
};

callback = function (response) {
  let str = "";
  response.on("data", function (chunk) {
    str += chunk;
  });
  response.on("end", function () {
    console.log(str);
  });
};

var req = http.request(options, callback);
req.end();
