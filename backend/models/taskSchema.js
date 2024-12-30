const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    task_id: {
        type: String,
        unique: true,
        default: function () {
            this._id.toString(); // Use MongoDB's _id as the default task_id
        },
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    update_date: {
        type: Date,
        default: Date.now
    },
    due_date: {
        type: Date,
        required: true
    },
    assigned_user_id: {
        type: Number,
        required: true
    },
    priority_id: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4]
    },
    status_id: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5]
    }
})

module.exports = mongoose.model('Task', taskSchema)