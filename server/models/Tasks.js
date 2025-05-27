const mongoose = require("mongoose")

// This schema file is the 2nd entry point to our DB. The connect.js file will connect to the DB but this schema file will search for the specific collection and returns an object to interact with.

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        trim: true,
        maxlength: [20, "Name length can't exceed 20 characters"],
        required: [true, "Name is mandatory"]
    }, 
    status: {
        type: Boolean,
        default: false
    },
    clicked: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Task", taskSchema) 
// mongoose will look for a collection named tasks if not exists, creates one.
// The model returns "Task" (singular with 1st letter in caps) as this is some naming convention. The mongoDB will convert it into plural (and lower the case of the first letter) and search for it.