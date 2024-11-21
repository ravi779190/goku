const express = require("express");

const router = express.Router();

// Render route after login for the logged in users only
router.get("/", async (req, res) => {
  if (!req.user) {
    res.status(401);
    res.json({message:"unauthorized user"});
    res.redirect("/login");
    return res;
  } // check for the req.user from auth middleare
  return res.redirect("/api/products"); // reditect to homepage if user is there

  //   const allurls = await URL.find({ createdBy: req.user._id });
  //   return res.render("home", {
  //     urls: allurls,
  //   });
});

// to render signup page from view
router.get("/signup", (req, res) => {
  return res.render("signup");
});

// to render login page from view
router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
