const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    index: { type: Number, required: true },
    text: { type: String, required: true },
})

module.exports = mongoose.model('ToDo', ToDoSchema);