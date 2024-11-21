const { v4: uuidv4 } = require("uuid");
const User = require("../models/user"); // import User Modal
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    // res.status(401);
    // res.json({ message: "Invalid Username or Password" });
    res.render("login", {
      error: "Invalid Username or Password",
    });
    return res;
  }

  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
