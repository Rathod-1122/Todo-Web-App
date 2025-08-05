const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.delete('/deleteTask/:id', async (req, res) => {

  try{
    await Task.findByIdAndDelete(req.params.id);
    res.json({status:"success",message:'Task deleted successfully'})
  }catch(err){
    res.json({status:"failed",message:'Unable to delete the task',error:err})
  }
  
});

module.exports = router;
