const express = require("express");
const app = express();
const mongoose = require("mongoose");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
const { jwtStrategy } = require("./middlewares/passport");
const routes = require("./routes");
const { handleError, convertToApiError } = require("./middlewares/apiError");

//mongodb
const mongoUri = process.env.DB_URI;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

///body parser
app.use(express.json());

///sanitize
app.use(xss());
app.use(mongoSanitize());

///passport
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

///CORS
app.use(cors());

//routes
app.use("/api", routes);

///ApiERROR handling
app.use(convertToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes  html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
