const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const passport = require("passport");
const path = require("path");

//app config
const app = express();
const port = process.env.PORT || 6800;

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
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname1, "/client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"));
  });
}
// -------------------------------------------

app.listen(port, (err) => {
  if (err) console.log("server not connected");
  else console.log("server is connected on port: " + port);
});
