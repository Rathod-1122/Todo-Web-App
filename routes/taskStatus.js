const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.put('/taskStatus/:id', async (req, res) => {
  const { id } = req.params;
  let update = {};

  try {
    if (req.body && req.body.completedAt === null) {
      update.completedAt = null;
    } else {
      update.completedAt = new Date();
    }

    const updatedTask = await Task.findByIdAndUpdate(id, update, { new: true });
    res.json(updatedTask);

  } catch (err) {
    console.error('Error updating task status:', err.message);
    res.status(500).json({ error: 'Failed to update task completion status' });
  }
});

module.exports = router;
