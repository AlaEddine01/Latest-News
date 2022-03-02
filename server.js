const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const passport = require("passport");
const path = require("path");

//app config
const app = express();
const PORT = process.env.PORT || 6800;

//  MiddleWares
app.use(express.json());
app.use(cors());

//  Import passport MiddleWare
require("./middleware/passport")(passport);

//  Connect Data Base
connectDB();

//  API Call
app.use("/articles", require("./routes/article"));
app.use("/users", require("./routes/article"));

// ------------------Deployment---------------
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// -------------------------------------------

app.listen(PORT, (err) => {
  if (err) console.log("server not connected");
  else console.log("server is connected on port: " + PORT);
});
