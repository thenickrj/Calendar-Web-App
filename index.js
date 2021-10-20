var express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const SignUpRouter = require("./routes/signup");
const EventsRouter = require("./routes/events");

require("dotenv").config();

var app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  // Event.find({ email: "name@email.com" }).then((res) =>
  //   console.log(res.length)
  // );
  console.log("MongoDB database connection established successfully");
});

var task = ["a", "b", "c", "d", "e"];
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/public", express.static("public"));

app.use("/", SignUpRouter);
app.use("/", EventsRouter);

app.get("/", function (req, res) {
  res.render("index", { task: task });
});

app.get("/dailyview/day=:id/month=:month/year=:year", function (req, res) {
  res.render("dailyview", { task: task });
});

app.get("/login", function (req, res) {
  res.render("login/login", { task: task });
});

app.get("/signup", function (req, res) {
  res.render("login/signup", { task: task });
});

app.listen(port, function () {
  console.log("Server running on port 3000");
});
