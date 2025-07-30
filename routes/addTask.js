const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.post('/addTask', async (req, res) => {
  const newTask = new Task({ text: req.body.text });
  await newTask.save();
  res.json(newTask);
});

module.exports = router;
