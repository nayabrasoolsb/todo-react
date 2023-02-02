const router = require("express").Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const Todo = require("../models/todo.js");

router.get("/fetch", async (req, res) => {
  try {
    const todoList = await Todo.find({ user: req.user }).sort({ _id: -1 });
    res.status(200).json({
      status: "success",
      todoList,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      messege: error.messege,
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    const todoList = await Todo.create({ ...req.body, user: req.user });
    res.status(200).json({
      status: "success",
      todoList,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      messege: error.messege,
    });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const todoList = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
    );
    res.status(200).json({
      status: "success",
      todoList,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      messege: error.messege,
    });
  }
});

module.exports = router;
