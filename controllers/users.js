const User = require("../models/user.js");

module.exports.renderSignUpForm = (req, res) => {
  res.render("user/signup.ejs");
};

module.exports.signUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to CozyCribs");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("user/login.ejs");
};

module.exports.LogIn = async (req, res) => {
  req.flash("success", "Welcome back to CozyCribs!");
  res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logOut = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you have logged out successfully!");
    res.redirect("/listings");
  });
};
