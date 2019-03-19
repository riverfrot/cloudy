const mongoose = require("mongoose");

const { Schema } = mongoose;

const ChatMessage = new Schema({
  roomID: String,
  text: String,
  userSocketID: String,
  userID: String,
  createdDate: {
    type: Date,
    default: new Date() // 현재 날짜를 기본 값으로 고정
  }
});

module.exports = mongoose.model("ChatMessage", ChatMessage);
