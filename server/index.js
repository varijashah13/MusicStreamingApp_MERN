const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = 8080;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload.identifier})
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist",playlistRoutes);

app.listen(port, () => {
  console.log("App is running on port " + port);
});
