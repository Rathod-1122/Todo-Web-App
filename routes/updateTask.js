const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.put('/updateTask/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true }
  );
  res.json(updatedTask);
});

module.exports = router;
