const Product = require("../models/product");

// fetch data from DB

const getAllProducts = async (req, res) => {
  // limit the filter to restrict unnecessary key insertion
  const { name, price, featured, rating, createdAt, company, sort, select } =
    req.query;

  const queryObj = {};

  // search functionality on name

  if (name) {
    // syntex to add regex expression to filter via field
    //     { <field>: { $regex: /pattern/, $options: '<options>' } }
    // { "<field>": { "$regex": "pattern", "$options": "<options>" } }
    // { <field>: { $regex: /pattern/<options> } }
    queryObj.name = { $regex: name, $options: "i" };
  }

  if (price) queryObj.price = price;
  if (featured) queryObj.featured = featured;
  if (rating) queryObj.rating = rating;
  if (createdAt) queryObj.createdAt = createdAt;
  if (company) queryObj.company = company;

  let apiData = Product.find(queryObj);

  // Sort Functionality // adding sort method based on query
  if (sort) {
    // add sort only if user type sort in query
    // asc = name for desc = -name for multiple sort name -price
    let sortFields = sort.split(",").join(" "); //replacing "," with " " for all the attributes
    apiData = apiData.sort(sortFields);
  }

  // Select Functionallity to return specific feilds only

  // Sort Functionality  // adding select method based on query
  if (select) {
    // add sort only if user type sort in query
    // for one field name for multiple fields sort name price
    let selectFields = select.split(",").join(" "); //replacing "," with " " for all the attributes
    apiData = apiData.select(selectFields);
  }

  // Pagination Functionality
  // if (req?.query?.page && req?.query?.limit) {
    let page = +req?.query?.page || 1;
    let limit = +req?.query?.limit || 10;

    let skip = (page - 1) * limit;

    apiData = apiData.skip(skip).limit(limit);
    console.log(queryObj, req.query, page, limit);
  // }

  const data = await apiData;

  res
    .status(200)
    .json({ data, msg: "success", status: 200, nbHits: data?.length });
};

const getAllProductsTesting = async (req, res) => {
  res.status(200).json({ msg: "I am getAllProductsTesting" });
};

module.exports = { getAllProducts, getAllProductsTesting };
