import express from 'express';
import mongoose from 'mongoose';
import {registerValidation} from './validations/auth.js';

import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/userController.js'


const PORT = process.env.port || 5000;
mongoose.set("strictQuery", false);

mongoose
  .connect(
    'mongodb+srv://MadKnight:SantaFe2020@cluster0.xy2m9ow.mongodb.net/blog?retryWrites=true&w=majority'
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
