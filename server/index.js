const express = require('express');
const router = require("./routes/tasks")
const connectDB = require("./db/connect") //module contains the function which connects to the DB
require("dotenv").config({ path: "C:/Users/adhik/PycharmProjects/node_js/task_manger/server/.env" }); //to access the variables declared in .env file
const cors = require('cors') //for cross origin resourse sharing, specifying which url(website) can request data from this server

const app = express();
const port = 8000;
const url = process.env.MONGO_URI //mongoDB connection string that contains the DB username, password of the user with project name, database name : "mongodb+srv://username:password@cluster_name.mongodb.net/mydatabase?querylikestuff"

//cors should be initialized before using the the route middleware else cors will not work
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST",  "PATCH", "DELETE"],
}))

app.use(express.json()) //To display the json data as json data itself which will be usually in binary format
app.use(express.static('/public')) //telling the server where static files are located
app.use("/api/v1/tasks", router) // using the app.use(), we're mounting the 'router' at path '/api/v1/tasks'.  Any route defined inside the router will be prefixed with /api/v1/tasks.

//things to display in home page/directory of the website
app.get("/", (req, res) => { 
    res.send("<h1>This is just starting</h1>")
})
//all urls other than the specified one will be directed to this route. This is usually used to handle when the user inputs incorrect url
app.get("*", (req, res) => {
    res.send("<h1>Something went wrong!</h1>")
})


const startServer = async () => {
    try{
        await connectDB(url);
        app.listen(port, () => console.log(`Server started on URL: http://localhost:${port}`))
    } catch(err){
        console.log(err);
    }
}

startServer()
//can't use IIFE here because it has a synchronous property while we have to await for connectDB() which is a contradiction.

// import "express-async-errors" to avoid writing redundant try catch blocks.
// Error property = { name: "Name of the Error", stack: "Name & path of where the error occured", message: "Name & description of the err", statusCode: "status code of the error like 404"}. Use these properties to get a meaning full context out of the error.
// create a folder named middleware that consist of errorHandler & pageNotFound middleware and also a customAPIError function. 
// errorHandler = This is the last line of defence that handles all the error at top level of backend. This console.logs the error and also res.json() a object with err.message and err.statusCode. This is usually placed at the bottom of index.js file to handle all the errors.
// pageNotFound = This middleware is placed after all the routes. *THE ORDER OF THE MIDDLWARE IS IMPORTANT* .This middlweare is called if all of the previous routes failed to match the request.
// customAPIError = This method takes a message and statusCode as arguments and then creates an Error object and returns it. This can be used in controller.js to throw custom errors that will be handled by errorHandler middleware.