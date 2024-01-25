import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import {connectUsingMongoose} from "./src/config/mongooseConfiq.js";
import todoRouter from "./src/todo/todo.routes.js";
import cors from "cors";

// 2. Create Server
const app = express();

dotenv.config();

app.use(cors());

//parsing the body in json format
app.use(bodyParser.json());

app.use("/api/todos", todoRouter);

app.get("/", (req, res) => {
  res.send("Welcome to task management APIs");
});

// Middleware to handle wrong path requests
app.use((req, res) => {
  res.status(404).send("API not found");
});

// 4. Specify port.
app.listen(process.env.PORT, () => {
  connectUsingMongoose();
  console.log(`Server is running at ${process.env.PORT}`);
});
