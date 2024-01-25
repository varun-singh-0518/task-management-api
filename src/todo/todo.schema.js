import mongoose, {Schema} from "mongoose";

export const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: String,
  },
});

const TodoModel = mongoose.model("Todo", todoSchema);

export default TodoModel;
