const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
