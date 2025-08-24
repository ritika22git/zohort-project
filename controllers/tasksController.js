// controllers/tasksController.js
const Task = require('../models/task');

// GET /tasks?status=...&page=...&page_size=...
exports.getTasks = async (req, res) => {
  try {
    const { page = 1, page_size = 10, status } = req.query;
    const filter = { user_id: req.user.id };
    if (status)
        filter.status = status;

    const tasks = await Task.find(filter)
      .sort({ created_at: -1 })
      .skip((page - 1) * page_size)
      .limit(parseInt(page_size));

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /tasks
exports.createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, user_id: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      req.body,
      { new: true } // return updated document
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
