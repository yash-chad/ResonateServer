const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportConfig = require("./config/passport-config");
const cookieSession = require("cookie-session");
//For accessing secrets from .env file
const dotenv = require("dotenv");
dotenv.config();

//DB
require("./db/mongoose");

//Importing Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");

const app = express();
//To prevent CORS Errors
// app.use(cors());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



//OAuth -Google
// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.session_cookieKey],
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// helmet
app.use(helmet());

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.set("json spaces", 2);

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/expense", expenseRoutes);

app.get("/*", (req, res) => {
  res.send("This is the default route");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is up on port " + PORT);
});
