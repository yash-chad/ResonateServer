const router = require("express").Router();
const passport = require("passport");

// auth login
// router.get("/login", (req, res) => {
//   console.log("In thelogin route");
//   res.render("login", { user: req.user });
// });

// auth logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/");
});

// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  console.log("IN the redirect pps");
  // res.send(req.user);
  res.redirect("http://localhost:3000/profile");
});

module.exports = router;
