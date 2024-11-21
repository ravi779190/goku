const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  // If no cookies available
  if (!userUid) {
    // res.status(403);
    // res.json({ message: "unauthorized user" });
    res.redirect("/login");
    return res;
  }
  const user = getUser(userUid);

  if (!user) {
    // res.status(401);
    // res.json({ message: "Invalid Username or Password" });
    res.redirect("/login");
    return res;
  }

  req.user = user;
  next();
}

// middleware function to allow for the next step only if user is logged in
async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid); //decode jwt toke to get user obj

  req.user = user; // add that user to the request
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
