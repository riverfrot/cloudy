const mongoose = require("mongoose");

const { Schema } = mongoose;

const ChatRoom = new Schema({
  // roomID: String,
  title: String,
  randomImageNumber: String,
  createdDate: {
    type: Date,
    default: new Date() // 현재 날짜를 기본 값으로 고정
  }
});

module.exports = mongoose.model("ChatRoom", ChatRoom);
