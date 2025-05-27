const express = require("express")
const router = express.Router(); //Creates a new instance of an Express router
const { getAllTasks, createTask, updateTask, deleteTask, getTask } = require("../controller/tasks") //importing all necessary methods to perform the desired operations.

router.route("/").get(getAllTasks).post(createTask) //route() specifies the route which will be: http://localhost/api/v1/tasks . It is chained to some method (like GET, POST, etc) that takes a callback as argument
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask); // route - http://localhost/api/v1/tasks/:id . All these method require the 'id' for it's operation which will be passed as parameter :id (:id is a like a variable)

module.exports = router