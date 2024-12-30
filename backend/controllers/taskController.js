const Task = require('../models/taskSchema')
const mongoose = require('mongoose')

// get all tasks
const getTasks = async (req, res) => {
    const tasks = await Task.find({}).sort({create_date: -1})

    res.status(200).json(tasks)
}

// get a single task
const getTask = async (req, res) => {
    const {id} = req.params

    // handling non valid id
    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findById(id)

    if (!task) {
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task)
}

// create a new task
const createTask = async (req, res) => {
    const { 
        title, 
        description, 
        due_date, 
        assigned_user_id, 
        priority_id, 
        status_id
    } = req.body

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (!due_date) {
        emptyFields.push('due_date')
    }
    if (!assigned_user_id) {
        emptyFields.push('assigned_user_id')
    }
    if (!priority_id) {
        emptyFields.push('priority_id')
    }
    if (!status_id) {
        emptyFields.push('status_id')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
        const task = await Task.create({
            title, 
            description, 
            due_date, 
            assigned_user_id, 
            priority_id, 
            status_id 
        }) 
        
        // Map the MongoDB _id to task_id
        task.task_id = task._id.toString();
        await task.save();

        res.status(200).json(task)
    } 
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// delete a task
const deleteTask = async (req, res) => {
    const {id} = req.params
    
    // handling non valid id
    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findOneAndDelete({ _id: id }) // property in mongo is _id but our var is id

    if (!task) {
        return res.status(400).json({error: 'No such task'})
    }

    res.status(200).json(task)
}

// update a task
const updateTask = async (req, res) => {
    const {id} = req.params

    const { 
        title, 
        description, 
        due_date, 
        assigned_user_id, 
        priority_id, 
        status_id
    } = req.body

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (!due_date) {
        emptyFields.push('due_date')
    }
    if (!assigned_user_id) {
        emptyFields.push('assigned_user_id')
    }
    if (!priority_id) {
        emptyFields.push('priority_id')
    }
    if (!status_id) {
        emptyFields.push('status_id')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
    
    // handling non valid id
    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findByIdAndUpdate({ _id: id }, {
        ...req.body,
        update_date: new Date()
    }, { new: true })

    if (!task) {
        return res.status(400).json({error: 'No such task'})
    }

    res.status(200).json(task)
}

module.exports = {
    getTask,
    getTasks,
    createTask,
    deleteTask,
    updateTask
}
