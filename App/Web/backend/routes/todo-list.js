import { Todo } from "../models/Todo";
import express from "express";
const router = express.Router();

router.get("/get", (req, res) => {
  Todo.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  Todo.findByIdAndUpdate(id, { done: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  Todo.findByIdAndDelete(id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.post("/add", (req, res) => {
  const { task } = req.body;
  Todo.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

export { router as TodoRouter };
