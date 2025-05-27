const mongoose = require("mongoose")

//declaration of a method that connects to a DB. the connection string is passed as the url which is fetched and also this function is called from index.js
const connectDB = async (url) => {
    try{
        await mongoose.connect(url)
        console.log("Connected to the DB")
    } catch(err) {
        console.log(err)
    }
}

module.exports = connectDB