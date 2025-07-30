
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv=require('dotenv')
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.listen(5000, () => console.log('Server running on port 5000'));


//-----Data Base Part----------//
let connectToMDB=async()=>{
  try{
        await mongoose.connect(process.env.mongoDBConnectionString);
        console.log('server has connected to database successfully')
  }catch(err){
        console.log('server unable to connect to the database',err)

  }
}

connectToMDB();

//------ Routes ------

app.use('/', require('./routes/fetchTasks'));
app.use('/', require('./routes/addTask'));
app.use('/', require('./routes/deleteTask'));
app.use('/', require('./routes/updateTask'));
app.use('/', require('./routes/taskStatus'));

