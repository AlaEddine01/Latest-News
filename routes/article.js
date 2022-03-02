const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//  Import Arlticle && User Models
const Article = require("../models/Article");
const User = require("../models/User");

//  Route Authorization MiddleWare
const checkAuth = require("../middleware/auth_validation");

// middleware user
//  Control user inputs
const { check, validationResult } = require("express-validator");
//  Check User inputs
ValidationInputsRules = (request, response, next) => [
  check("email", "this field is required!!!").notEmpty(),
  check("email", "this field should be a valid Email !!").isEmail(),
];
//  Errors Handler
ValidatorErrorsHandler = (request, response, next) => {
  const errors = validationResult(request);
  errors.isEmpty() ? next() : response.json({ errors: errors.array() });
};

///////////////////////////////////// ARTICLES //////////////////////////////////////////

//  Get All Articles
router.get("/display_Article", checkAuth, (request, response) => {
  Article.find()
    .sort({ date: -1 })
    .then((articles) => response.send(articles))
    .catch((err) => console.log(err));
});

//  Get Articles By Category
router.get("/news/:category", checkAuth, (req, res) => {
  const { category } = req.params;
  Article.find({ category })
    .then((articles) => res.send(articles))
    .then(console.log("fffffffffffff"))
    .catch((err) => console.log(err));
});

//  Get Articles By Likes
router.get("/mostliked", checkAuth, (req, res) => {
  Article.find({})
    .sort({ like: -1 })
    .then((articles) => res.send(articles))
    .catch((err) => console.log(err));
});

//  Get Article By Id
router.get("/display_Article/:_id", checkAuth, (request, response) => {
  const { _id } = request.params;
  Article.findOne({ _id })
    .then((articles) => response.send(articles))
    .catch((err) => console.log(err));
});

// Add Article
//    Error handled with code 408 when article already exist
router.post("/Add_Article", checkAuth, (request, response) => {
  const content = request.body.content !== null ? request.body.content : "_";
  const { title, image, category, url, like, date, description } = request.body;
  // console.log(content);
  Article.findOne({ title }).then((article) => {
    if (article) return response.status(480).send("Article Already Exist");
    else {
      let NewArticle = new Article({
        title,
        image,
        content,
        description,
        category,
        like,
        date,
        url,
      });
      NewArticle.save()
        .then((articles) => response.send(articles))
        .catch((err) => console.error(err));
    }
  });
});

//   Delete Article By Id
router.delete("/Delete_Article/:_id", checkAuth, (request, response) => {
  const { _id } = request.params;
  Article.findOneAndDelete({ _id: _id })
    .then((articles) => response.send("article is deleted"))
    .catch((err) => console.log(err));
});

//  Update Article By Id
router.put("/Update_Article/:_id", checkAuth, (request, response) => {
  const { _id } = request.params;
  const { title, image, content, category } = request.body;
  Article.findOneAndUpdate(
    { _id },
    { $set: { title, image, content, category } }
  )
    .then((articles) => response.send("article is updated"))
    .catch((err) => console.log(err));
});

///////////////////////////////////// COMMENTS //////////////////////////////////////////

//  Add Comment
router.put("/:_id/add_comment", checkAuth, (request, response) => {
  const _id = request.params._id;
  let comment = request.body;
  Article.findOneAndUpdate({ _id }, { $push: { comment } })
    .then((data) => response.send(data.comment))
    .catch((err) => console.log(err));
});

//  Delete comment
router.put("/:_id/delete_comment/:cmntId", checkAuth, (req, res) => {
  const _id = req.params._id;
  const cmntId = req.params.cmntId;
  Article.findOneAndUpdate({ _id }, { $pull: { comment: { _id: cmntId } } })
    .then((msg) => res.send("comment deleted"))
    .catch((err) => console.log(err));
});

//  Edit Comment
router.put("/:_id/edit_comment/:cmntId", checkAuth, (req, res) => {
  const _id = req.params._id;
  const cmntId = req.params.cmntId;
  Article.findOneAndUpdate(
    { _id, "comment._id": cmntId },
    { $set: { "comment.$": req.body } }
  )
    .then((msg) => res.send("comment updated"))
    .catch((err) => console.log(err));
});

/////////////////////////////////////// LIKES ///////////////////////////////////////////

//  Increment Likes
router.put("/:_id/inclikes", checkAuth, (req, res) => {
  const _id = req.params._id;
  Article.findOneAndUpdate({ _id }, { $inc: { like: 1 } })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

//  Decrement Likes
router.put("/:_id/declikes", checkAuth, (req, res) => {
  const _id = req.params._id;
  Article.findOneAndUpdate({ _id }, { $inc: { dislike: -1 } })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

/////////////////////////////////////// USERS ///////////////////////////////////////////

//  Get All Users
router.get("/display_Users", checkAuth, (request, response) => {
  User.find()
    .then((user) => response.send(user))
    .catch((err) => console.log(err));
});

//  User SignUp (Verified: unique user && crypted pswrd && pswrd length = 8)
router.post(
  "/add_user",
  ValidationInputsRules(),
  ValidatorErrorsHandler,
  (req, res) => {
    const { email, password, pseudo, name, role } = req.body;
    // Test if user already exist !
    User.findOne({ email }).then((user) => {
      if (user) return res.sendStatus(409);
      else {
        const newUser = new User({ email, password, pseudo, name, role });
        // Cripting the password && length equal to 8
        password.length === 8
          ? bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(password, salt, (err, hash) => {
                newUser.password = hash;
                newUser
                  .save()
                  .then((newuser) => res.json(newuser))
                  .catch((err) => console.error(err));
              });
            })
          : res.send("Password length shoud be equal to 8");
      }
    });
  }
);

//  User Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) res.sendStatus(404);
      else {
        if (!user.isBlocked) {
          bcrypt.compare(password, user.password).then((isMatched) => {
            if (isMatched) {
              const payload = {
                id: user._id,
                pseudo: user.pseudo,
                role: user.role,
              };
              jwt.sign(
                payload,
                "session",
                { expiresIn: "1d" },
                (err, token) => {
                  if (err) res.sendStatus(500);
                  else res.json({ token: token });
                }
              );
            } else res.sendStatus(400);
          });
        } else {
          res.sendStatus(505);
        }
      }
    })
    .catch((err) => res.send("Server error !"));
});

// block user
router.put("/block_user/:_id", checkAuth, (req, res) => {
  const _id = req.params._id;
  User.findById({ _id })
    .then((user) => {
      if (!user.isBlocked) {
        User.findOneAndUpdate({ _id }, { $set: { isBlocked: true } })
          .then((users) => res.send(users))
          .catch((err) => console.log(err));
      } else {
        User.findOneAndUpdate({ _id }, { $set: { isBlocked: false } })
          .then((users) => res.send(users))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

//  Validate Token
router.get(
  "/validate",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

module.exports = router;
