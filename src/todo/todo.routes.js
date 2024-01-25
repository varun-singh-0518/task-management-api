import express from "express";
import TodoController from "./todo.controller.js";

const todoRouter = express.Router();
const todoController = new TodoController();

todoRouter.get("/", todoController.getAllTodos);

todoRouter.post("/add", todoController.createTodo);

todoRouter.put("/:id", todoController.updateTodo);

todoRouter.delete("/:id", todoController.deleteTodo);

todoRouter.put("/:id/toggle", todoController.toggleTodo);

export default todoRouter;
