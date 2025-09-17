const webpush = require("web-push");
const express = require("express");
const cors = require("cors");
var morgan = require("morgan");

const app = express();
const keys = {
  publicKey:
    "BDvZAG03pFI5SQFeqxJBAnlsJY1TZki3wxVRNAxtkjaOCO7_JcYZmEFp7Y9AIuXc6zSZpxKnawAAA1HFHsib6Qc",
  privateKey: "Jh_w5TU_q6tUZdk73MauZoPML__B0YR5nk2zLvPmmSQ",
};

const publicVapidKey = keys.publicKey;
const privateVapidKey = keys.privateKey;

// Replace with your email
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
webpush.setVapidDetails(
  "mailto:val@karpov.io",
  publicVapidKey,
  privateVapidKey
);
app.use(morgan("dev"));
app.use(cors());
// app.options("*", cors()); // جواب به OPTIONS
app.use(express.static("./"));
app.use(express.json());
app.use(express.urlencoded());
app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({title: "test"});

  console.log(subscription);

  webpush.sendNotification(subscription, payload).catch((error) => {
    console.error(error.stack);
  });
});
const http = require("http");
const server = http.createServer(app);

server.listen(5300, () => {
  console.log("Server started on port 5000");
});
