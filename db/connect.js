const mongoose = require("mongoose");

const connectDb = (uri) => {
    console.log("connected to DB")
  return mongoose.connect(uri);
};

module.exports = connectDb;
