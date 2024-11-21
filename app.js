require("dotenv").config();

// Connect with out BE / Server

const express = require("express");
const app = express();

const path = require("path");
const cookieParser = require("cookie-parser");

const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

//  import DB

const connectDB = require("./db/connect");

// Create a port ---- 5000 on local

const PORT = process.env.PORT || 5001;

// to get the routes
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const productsRoutes = require("./routes/products");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// define routes for api through middleware
app.use("/", checkAuth, staticRoute);  //check for login user then goes to static routess
app.use("/user",  userRoute); // public access for user routes like log in
app.use("/api/products", restrictToLoggedinUserOnly,  productsRoutes); // restricted to loggedin users only

//  Start the server

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`${PORT}, Yes I am Connect`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
