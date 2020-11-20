const express = require("express");
const mongoose = require("mongoose");
const Messages = require("./models/messageModel");
const Pusher = require("pusher");
const cors = require("cors");
const { db } = require("./models/messageModel");
require("dotenv").config();

const app = express();
const port = process.env.port || 9000;

const pusher = new Pusher({
  appId: "1109948",
  key: "639cb43c9e51d063cebf",
  secret: "b8914461fc6d42c4e3a7",
  cluster: "ap1",
  useTLS: true,
});

app.use(express.json());
app.use(cors());

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
mongoose.set("useFindAndModify", false);

app.get("/", (req, res) => res.status(200).send("Hello world"));
app.post("/api/v1/message/new", (req, res) => {
  console.log(req.body);
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/api/v1/message/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

const changeStream = Messages.watch();
changeStream.on("change", (change) => {
  console.log(change);
  if (change.operationType === "insert") {
    const messageDetails = change.fullDocument;
    pusher.trigger("messages", "insert", {
      name: messageDetails.name,
      message: messageDetails.message,
      timestamp: messageDetails.timestamp,
      received: messageDetails.received,
    });
  }
});
// app.listen(port, () => console.log(`Listening on localhost:${port}`));
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((response) => {
    // DB connected successfully
    console.log("DB connection successful");

    app.listen(port, () => {
      console.log(`Biscoff Bakery app listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
