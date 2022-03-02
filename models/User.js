const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: { type: String },
  pseudo: { type: String },
  email: { type: String },
  password: { type: String },
  date: { type: Date, default: Date.now },
  role: { type: String, default: "user" },
  isBlocked: { type: Boolean, default: false },
  avatar: { type: String },
});
module.exports = User = mongoose.model("user", UserSchema);
