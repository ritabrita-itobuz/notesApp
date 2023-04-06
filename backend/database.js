
import * as mongoose from 'mongoose';
import * as Cors from 'cors';
import express, { request } from 'express';

const app = express();

app.use(express.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");   
    next();
})

mongoose.connect("mongodb+srv://ritabrita:rito2001@cluster.qlbdclu.mongodb.net/?retryWrites=true&w=majority", {
useNewUrlParser: true,
useUnifiedTopology: true
}).then(()=>{
    console.log("Connected...")
});

const todoSchema = new mongoose.Schema({
    taskname: {
        type: String
    },
    task: {
        type: String
    }
})

const Todo = mongoose.model("Todo", todoSchema);

app.get("/read", async(req, res) => {
    const data = await Todo.find({});
    try {
        res.send(data);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post("/create", async(req, res) => {
    const data = new Todo(req.body);
    console.log(data);
    try {
        await data.save();
        res.send(data);
      } catch (error) {
        res.status(500).send(error);
      }
})

app.patch("/update/:id", async (req, res) => {
    try {
      await Todo.findByIdAndUpdate(req.params.id, req.body);
      await Todo.save();
      res.send(data);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.put("/updatetask/:id", async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, req.body);
    await Todo.save();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
    try {
      const data = await Todo.findByIdAndDelete(req.params.id);
  
      if (!data) res.status(404).send("No item found");
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
});

app.listen(5501, "127.0.0.1");