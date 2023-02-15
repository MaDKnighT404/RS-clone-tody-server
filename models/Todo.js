import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
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

export const TodoModel = mongoose.model('Todo', TodoSchema);
