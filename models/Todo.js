import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    note: {
      type: String,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    deadlineId: {
      type: String,
      default: 'today',
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
  },
  {
    timestamps: true,
  }
);

export const TodoModel = mongoose.model('Todo', TodoSchema);
