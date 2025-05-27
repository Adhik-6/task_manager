const Task = require('../models/Tasks') //imports the variable named Task which is used to interact with the DB

// whenever interacting with DB use await as it may take some time to do the DB operation
// we use res.json(data) to send the data and not res.send(data) because we are sending a content-type:json to the frontend. we're telling the frontend that a json data is coming

const getAllTasks = async (req, res) => {
    try{
        const data = await Task.find({})  //returns all documents from the collection if nothing is specified inside {}
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({message: err})
    }
}

const createTask = async (req, res) => {
    try{
        const task = await Task.create(req.body) //returns the newly created document
        res.status(201).json(await Task.find({})) //we need the updated database (not the newly created document), so we fetch all documents
    } catch (err) {
        res.status(500).json({message: err})
    }
}

// deleting, updating, fetching single task requires id of a specific document
// url: http://localhost:8000/api/v1/tasks/:id  this ':id' is accessed by req.params.id by using the `${}` in frontend you can pass on the id like: http://localhost:8000/api/v1/tasks/25u784utmvvn8
const getTask = async (req, res) => {
    try{
        const taskID =  req.params.id
        const data = await Task.findOne({_id: taskID})
        if(!data){
            return res.status(404).json({msg: `${req.params.id} not found`})
        }
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

const deleteTask = async (req, res) => {
    try{
        const taskID = req.params.id
        const data = await Task.findOneAndDelete({_id: taskID});
        if(!data){
            return res.status(404).json({msg: `${req.params.id} not found`})
        }
        res.status(200).json(await Task.find())
    } catch (err){
        res.status(500).json({ error: err.message})
    }
}

const updateTask = async (req, res) => {
    try{
        const taskID = req.params.id
        const data = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new: true,
            runValidators: true
        })
        res.status(201).json(await Task.find())
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}