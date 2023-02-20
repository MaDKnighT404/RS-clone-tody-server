import mongoose from 'mongoose';
import Inc from "mongoose-sequence";
const AutoIncrement = Inc(mongoose); 

const TodoSchema = mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  note: {
    type: String,
    default: '',
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  deadlineAt: {
    type: Number,
    default: 0,
  },
  deadlineDate: {
    type: String,
    default: '',
  },
  pomodorosNumber: {
    type: Number,
    default: 0,
  },
  pomodoroTime: {
    type: Number,
    default: 0,
  },
  completedPomodors: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

TodoSchema.plugin(AutoIncrement, {inc_field: 'order'});
export const TodoModel = mongoose.model('Todo', TodoSchema);