import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import dotenv from 'dotenv';
import cors from 'cors';
import {
  registerValidation,
  loginValidation,
  todoCreateValidation,
} from './validations.js';
import {checkAuth, handleValidationErrors} from './utils/index.js';
import {UserController, TodoController} from './controllers/index.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', false);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@cluster0.9prktza.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => console.log('DB ok'))
  .catch(() => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({storage});
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors());

app.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  '/auth/register',
  registerValidation,
  handleValidationErrors,
  UserController.register
);

app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/todos', TodoController.getAll);

app.get('/todos/incompleted/:userId', TodoController.getAllInCompletedTodos);
app.get('/todos/completed/:userId', TodoController.getAllCompletedTodos);

app.get('/todos/:userId', TodoController.getAllTodosForUser);

app.get('/todos/:id', TodoController.getOne);
app.post(
  '/todos',
  checkAuth,
  todoCreateValidation,
  handleValidationErrors,
  TodoController.create
);
app.delete('/todos/:id', checkAuth, TodoController.remove);
app.patch(
  '/todos/:id',
  checkAuth,
  todoCreateValidation,
  handleValidationErrors,
  TodoController.update
);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server is starting on port ${PORT}`);
});
