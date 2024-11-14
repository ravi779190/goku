// Add data to DB

// to access the env variables
require("dotenv").config()

// get DB
const connectDB = require("./db/connect");
const Product = require("./models/product");


//  get mock data from json file
const productsJson = require("./products.json")

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    await Product.deleteMany(); // to delete before adding data
    await Product.create(productsJson)
    console.log("products created")
  } catch (e) {
    console.log(e);
  }
};

start();
