const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.post('/addTask', async (req, res) => {
  try{
    const newTask = new Task({ text: req.body.text });
    await newTask.save();
    res.json({status:'success',message:"Task Added successfully"});
  }catch(err){
    res.json({status:'failed',message:"Unable to add the task",error:err});
  }
  
});

module.exports = router;
