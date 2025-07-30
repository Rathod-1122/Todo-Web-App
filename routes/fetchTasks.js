const express=require('express')
const router=express.Router();
const Task = require('../models/Task');

router.get('/fetchTasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }

});

module.exports = router;