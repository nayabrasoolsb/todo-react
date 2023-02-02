const express = require("express");
const app = express();
const secret = "APITODO";
const loginRoute = require("./routes/login-reg.js");
require("./connections/connection.js");
const todoRoute = require("./routes/todo.js");
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(cors())
app.use("/api/v1/todo", (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          messege: "server error",
        });
      }
      req.user = decoded.data;
      next();
    });
  } else {
    res.status(401).json({
      status: "messege",
      messege: "invalid token",
    });
  }
});

app.use("/api/v1/todo", todoRoute);
app.use("/api/v1", loginRoute);

app.get("/", (req, res) => {
  res.send("ok");
});

app.get("*", (req, res) => {
  res.status(404).json({
    status: "failed",
    messege: "page not found",
  });
});

app.listen(3004, () => console.log("server is up on port 3004"));
