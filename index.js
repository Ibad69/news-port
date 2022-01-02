const express = require("express");
const users = require("./routes/user");
const userAuth = require("./routes/userAuth");
const post = require("./routes/post");
const authToken = require("./funcs/authenticateToken");
const admin = require("./routes/admin");

const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const channel = require("./routes/channel");
const multer = require("multer");

var uploads = multer().any();

//app.use(uploads);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(
//   session({ secret: "linkitsoft123", resave: false, saveUninitialized: false })
// );

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, timeZone, x-token"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  next();
});

app.use("/user", users);
app.use("/userAuth", userAuth);
app.use("/post", post);
app.use("/channel", channel);
app.use("/admin", admin);

app.get("/", (req, res) => {
  res.send("working");
});

mongoose
  .connect("mongoDDLINK", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("connected" + result);
    app.listen(process.env.PORT || 8080);
  })
  .catch((err) => console.log(err));
