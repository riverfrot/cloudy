const mongoose = require("mongoose");
const crypto = require("crypto");
const { generateToken } = require("../lib/token");
const { Schema } = mongoose;

const Account = new Schema({
  id: String,
  password: String,
  nickName: String,
  social: {
    facebook: {
      id: String,
      accessToken: String
    },
    google: {
      id: String,
      accessToken: String
    }
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

function hash(password) {
  return crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(password)
    .digest("hex");
}

// Account.statics.findByUser = function(username) {
//   return this.findOne({ "profile.username": username }).exec();
// };

Account.statics.findById = function(id) {
  return this.findOne({ id }).exec();
};

Account.statics.findByEmailOrUsername = function({ id, nickName }) {
  return this.findOne({
    // $or 연산자를 통해 둘중에 하나를 만족하는 데이터를 찾습니다.
    $or: [{ id }, { nickName }]
  }).exec();
};

Account.statics.localRegister = function({ id, nickName, password }) {
  const account = new this({
    id,
    nickName,
    password: hash(password)
  });

  return account.save();
};

// 함수로 전달받은 password의 해시값과 데이터에 담겨있는 해시값을 비교합니다.
Account.methods.validatePassword = function(password) {
  const hashed = hash(password);
  return this.password === hashed;
};

Account.methods.generateToken = function() {
  // JWT 에 담을 내용
  const payload = {
    _id: this._id,
    id: this.id
  };

  return generateToken(payload, "account");
};

module.exports = mongoose.model("Account", Account); // 실제 DB상에는 Accouts와 같이 복수형으로 생성 됩니다.
