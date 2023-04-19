import * as mongoose from "mongoose";
import * as Cors from "cors";
import express, { request } from "express";


// object des
// import
// middleware next node js

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

mongoose
  .connect(
    "mongodb+srv://ritabrita:rito2001@cluster.qlbdclu.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected...");
  });

const noteSchema = new mongoose.Schema({
  taskname: {
    type: String,
  },
  task: {
    type: String,
  },
});

const note = mongoose.model("note", noteSchema);

app.get("/read", async (req, res) => {
  const data = await note.find({});
  try {
    res.send(data);
  } catch (error) {
    res.status(500).send({
      data: null, 
      message: error.messge,
      success: false
    });
  }
});

app.post("/create", async (req, res) => {
  const data = new note(req.body);
  console.log(data);
  try {
    await data.save();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch("/update/:id", async (req, res) => {
  try {
    await note.findByIdAndUpdate(req.params.id, req.body);
    await note.save();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/updatetask/:id", async (req, res) => {
  try {
    await note.findByIdAndUpdate(req.params.id, req.body);
    await note.save();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const data = await note.findByIdAndDelete(req.params.id);

    if (!data) res.status(404).send("No item found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(5501, "127.0.0.1");
