const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  taskDescription: {
    type: String,
    required: true
  },
  assignee: {
    type: String
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Completed', 'Pending', 'Ongoing'],
    required: true
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
