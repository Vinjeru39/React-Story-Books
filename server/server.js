const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo");

const connectDB = require("./config/db");

const app = express();

//Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//dotenv config
dotenv.config({ path: "./config/config.env" });

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//Passport config
require("./config/passport")(passport);

connectDB();

//Logging with morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false, //we don't want to sava a session if nothing is modified
    saveUninitialized: false, //don't create a session until something is stored
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Set global var
app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated(); //we have access to req.user due to passport auth
  next();
});

//routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use((req, res, next) => {
  //ensure Authentication middleware
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("http://localhost:3000");
  }
});
app.use("/stories", require("./routes/stories"));

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
