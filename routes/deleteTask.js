const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.delete('/deleteTask/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
