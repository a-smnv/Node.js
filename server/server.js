const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local");
const BearerStrategy = require("passport-http-bearer");

const app = express();
const port = 8080;
const secret = "TheOwlsAreNotWhatTheySeem";

// app.post("/", (request, response, next) => {
//   if (request.headers.iknowyoursecret === "TheOwlsAreNotWhatTheySeem") {
//     console.log("This is the right secret");
//     next();
//   } else {
//     console.log("You have to know my secret");
//     response.end();
//   }
// });

mongoose.connect("mongodb://localhost:27017/users", { useNewUrlParser: true });
const UserSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    jwt: String,
  },
  { collection: "users" }
);
const User = mongoose.model("User", UserSchema, "users");

const localStrategy = new LocalStrategy(
  { usernameField: "username", passwordField: "password" },
  (username, password, done) => {
    User.find({ username: username })
      .exec()
      .then((foundUser) => {
        console.log(foundUser);
        if (!foundUser || !foundUser.length) {
          console.log("not found user");
          done(null, "not found user");
        } else if (foundUser[0].password === password) {
          done(null, foundUser[0]);
          console.log("success", foundUser);
        } else {
          console.log("invalid password");
          done("invalid password");
        }
      });
  }
);

const bearerStrategy = new BearerStrategy((token, done) => {
  User.findOne({ jwt: token })
    .exec()
    .then((foundUser) => {
      if (!foundUser) {
        console.log("invalid jwt");
        done(null, false);
      }
      console.log("bearer found: ", foundUser);
      done(null, foundUser);
    });
});
passport.use("local", localStrategy);
passport.use("bearer", bearerStrategy);

passport.serializeUser((user, done) => {
  let token = jwt.sign({ username: user.username }, secret, {
    expiresIn: "24h",
  });
  User.updateOne(
    { username: user.username },
    { jwt: token },
    (err, updatedUser) => {
      console.log("updated result", updatedUser);
      done(null, updatedUser);
    }
  );
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(bodyParser.json());

app.use(passport.initialize());

app.post(
  "/token",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/failure",
  })
);
app.get(
  "/",
  passport.authenticate("bearer", { session: false }),
  (request, response) => {
    console.log(
      `Hi there ${request.user.username}, I know your JWT ${request.user.jwt}`
    );
    response.end();
  }
);

// app.post("/", (request, response) => {
//   const name = request.headers.username;
//   const ip = request.connection.remoteAddress;

//   const user = new User({ name: name, ip: ip });

//   user.save((error, savedUser) => {
//     if (error) {
//       throw error;
//     }
//     response.send(`Hi there ${savedUser.name}, I know your ip:${savedUser.ip}`);
//   });
// });

app.listen(port, () => {
  console.log(`Server listening on ${port}!`);
  User.find({}, (err, users) => {
    console.log(
      "In the collection at the moment:",

      users.map((u) => u.username + " " + u.password + " " + u.jwt).join(", ")
    );
  });
});
