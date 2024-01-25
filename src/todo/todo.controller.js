import ApplicationError from "../error-handler/applicationError.js";
import TodoModel from "./todo.schema.js";

export default class TodoController {
  async getAllTodos(req, res) {
    try {
      const todos = await TodoModel.find();
      res.send(todos);
    } catch (err) {
      console.error(err);
      throw new ApplicationError("Internal Server Error", 500);
    }
  }

  async createTodo(req, res) {
    const {title, description, dueDate} = req.body;
    const newTodo = new TodoModel({title, description, dueDate});

    try {
      const savedTodo = await newTodo.save();
      res.status(201).send(savedTodo);
    } catch (err) {
      console.error(err);
      throw new ApplicationError("Internal Server Error", 500);
    }
  }

  async updateTodo(req, res) {
    const {id} = req.params;
    const {newTodo} = req.body;
    const {title, description, dueDate} = newTodo;

    try {
      const updatedTodo = await TodoModel.findByIdAndUpdate(
        id,
        {title, description, dueDate},
        {new: true}
      );

      if (!updatedTodo) {
        return res.status(404).send("Todo not found");
      }

      res.send(updatedTodo);
    } catch (err) {
      console.error(err);
      throw new ApplicationError("Internal Server Error", 500);
    }
  }

  async deleteTodo(req, res) {
    const {id} = req.params;

    try {
      const deletedTodo = await TodoModel.findByIdAndDelete(id);

      if (!deletedTodo) {
        return res.status(404).send("Todo not found");
      }

      res.send(deletedTodo);
    } catch (err) {
      console.error(err);
      throw new ApplicationError("Internal Server Error", 500);
    }
  }

  async toggleTodo(req, res) {
    const {id} = req.params;

    try {
      const todo = await TodoModel.findById(id);

      if (!todo) {
        return res.status(404).send("Todo not found");
      }

      todo.completed = !todo.completed;
      const updatedTodo = await todo.save();

      res.send(updatedTodo);
    } catch (err) {
      console.error(err);
      throw new ApplicationError("Internal Server Error", 500);
    }
  }
}
