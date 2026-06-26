const express = require("express");

const app = express();
const PORT = 3002;

app.use(express.json());

let todos = [
  {
    id: 1,
    task: "Learn Express",
    completed: false,
  },
];

// GET all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// GET active todos
app.get("/todos/active", (req, res) => {
  const activeTodos = todos.filter((todo) => !todo.completed);
  res.json(activeTodos);
});

// GET single todo
app.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  res.json(todo);
});

// CREATE todo
app.post("/todos", (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({
      message: "Task field is required",
    });
  }

  const newTodo = {
    id: todos.length + 1,
    task,
    completed: false,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// UPDATE todo
app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  const { task, completed } = req.body;

  if (task !== undefined) {
    todo.task = task;
  }

  if (completed !== undefined) {
    todo.completed = completed;
  }

  res.json(todo);
});

// DELETE todo
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  todos.splice(index, 1);

  res.json({
    message: "Todo deleted successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});