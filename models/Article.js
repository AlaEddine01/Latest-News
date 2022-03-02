const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  content: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  url: { type: String, required: true },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  comment: [
    {
      author: { type: String, required: true },
      authorID: { type: String, required: true },
      content_comment: { type: String, required: true },
      date_comment: { type: Date, default: Date.now },
    },
  ],
});
module.exports = Article = mongoose.model("article", articleSchema);
