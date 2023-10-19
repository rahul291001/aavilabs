const Task = require('../models/task');

const create = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a new task', details: error.message });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const deletedTask = await Task.findByIdAndRemove(taskId);
    if (!deletedTask) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json({ message: 'Task deleted successfully' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete the task', details: error.message });
  }
};

const edit = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json(updatedTask);
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update the task', details: error.message });
  }
};

const display = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch tasks', details: error.message });
  }
};

module.exports = {
  create,
  deleteTask, 
  edit,
  display,
};
