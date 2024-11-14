

require('dotenv').config();

// Connect with out BE / Server

const express = require('express');
const app = express()

//  import DB 

const connectDB = require("./db/connect")

// Create a port ---- 5000 on local

const PORT = process.env.PORT || 5001

//  define rotes for api 

app.get("/", (req, res) => {
    res.send("hey I am live")
})

// to get the routes 
const products_routes = require("./routes/products")

// middleware or to set router 

app.use("/api/products", products_routes)


//  Start the server 

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(PORT, ()=>{
            console.log(`${PORT}, Yes I am Connect`);  
        })

    } catch (error) {
        console.log(error);
    }
}

start()