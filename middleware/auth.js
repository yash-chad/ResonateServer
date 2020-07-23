const auth = (req, res, next) => {
  if (!req.user) {
    // res.redirect("http://localhost:3000/login");
  } else {
    next();
  }
};

module.exports = { auth };
