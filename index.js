const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const BASE_URI =
  "mongodb+srv://uzzi_speaks:Pakistan123@cluster0.ggxogiz.mongodb.net/tododb";
app.use(express.json());
async function connectDb(){
  try{
    await mongoose.connect(BASE_URI, {
      useNewUrlParser:true
    });
    console.log("Database Connected")
  }
  catch(error){
    console.log(error);
    process.exit();
  }
}
connectDb();
const todoSchema=new mongoose.Schema({
todo:String,
});
const TodoModel=mongoose.model('todo',todoSchema);
app.post('/create',async(req,res)=>{

  const {todo}=req.body;
  const todos=new TodoModel({
    todo
  });
  await todos.save();
  res.status(200).json(todos);
});
app.get('/get',async(req,res)=>{
  const todos =await TodoModel.find();
  res.status(200).json( todos);
});
app.put('/update',async(req,res)=>{
  const {id,todo}=req.body;
  const todos =await TodoModel.findByIdAndUpdate(id,{todo},{new:true});
  res.json(todos);
});
app.delete('/delete/:id',async(req,res)=>{
  const todos =await TodoModel.findByIdAndDelete(req.params.id);
  res.json(todos);
});

app.listen(PORT, () => console.log(`server running on localhost:${PORT}`));