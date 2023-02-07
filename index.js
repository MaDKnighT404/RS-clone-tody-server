import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import {registerValidation} from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', false);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@cluster0.xy2m9ow.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => console.log('DB ok'))
  .catch(() => console.log('DB error', err));

const app = express();
app.use(express.json());
app.use(cors());
app.post('/auth/login', UserController.login);

app.post('/auth/register', registerValidation, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server is starting on port ${PORT}`);
});
