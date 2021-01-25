const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;

app.post("/", (request, response, next) => {
  if (request.headers.iknowyoursecret === "TheOwlsAreNotWhatTheySeem") {
    console.log("This is the right secret");
    next();
  } else {
    console.log("You have to know my secret");
    response.end();
  }
});

mongoose.connect("mongodb://localhost:27017");
const UserSchema = mongoose.Schema({ name: String, ip: String });
const User = mongoose.model("Users", UserSchema);

app.post("/", (request, response) => {
  const name = request.headers.username;
  const ip = request.connection.remoteAddress;
  const user = new User({ name: name, ip: ip });

  user.save((error, savedUser) => {
    if (error) {
      throw error;
    }
    response.send(`Hi there ${savedUser.name}, I know your ip:${savedUser.ip}`);
  });
});

app.listen(port, () => {
  console.log(`Server listening on ${port}!`);
  User.find({}, (err, users) => {
    console.log(
      "In the collection at the moment:",
      users.map((u) => u.name).join(", ")
    );
  });
});
