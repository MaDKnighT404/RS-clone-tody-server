import express from 'express';
import mongoose from 'mongoose';
import {registerValidation} from './validations/auth.js';

import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/UserController.js'


const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);

mongoose
  .connect(
    'mongodb://mongo:5SttEwBvlE26BsRArKSu@containers-us-west-178.railway.app:7775',
  )
  .then(() => console.log('DB ok'))
  .catch(() => console.log('DB error', err));

const app = express();
app.use(express.json());

app.post('/auth/login', UserController.login)

app.post('/auth/register', registerValidation, UserController.register);

app.get('/auth/me', checkAuth,UserController.getMe )

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server is starting on port ${PORT}`);
});
