const router = require("express").Router();
let SignUp = require("../models/signup.model");

router.route("/users").get((req, res) => {
  SignUp.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Route to check if the login credentials are valid
router.route("/login").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  SignUp.findOne({ email: email })
    .then((user) => {
      if (user.password === String(password)) {
        res.json({ status: true, username: user.name });
        return;
      } else {
        res.json({ status: false });
        return;
      }
    })
    .catch((err) => res.json("No such account exists"));
});

// Route to a signup a new user
router.route("/signup").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const newSignUp = new SignUp({ name, email, password });

  newSignUp
    .save()
    .then(() => res.json("New User Signed Up!!"))
    // .catch((err) => res.status(400).json("Error: " + err));
    .catch((err) => res.json("Account already exist"));
});

module.exports = router;
