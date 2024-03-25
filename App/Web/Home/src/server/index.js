const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./model/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/PFE");

app.get("/get", (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate(id, { done: true })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.post("/add", (req, res) => {
    const { task } = req.body;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err));
});

app.listen(3002, () => {
    console.log("Server is running");
});
