const jwt = require("jsonwebtoken");
const secret = `Goku@#123456`; // only allow to change the token with this secret key

function setUser(user) {
  console.log("user", user);
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
}
function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
}

module.exports = { setUser, getUser };
