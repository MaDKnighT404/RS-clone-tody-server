import {body} from 'express-validator';

export const registerValidation = [
  body('email', 'Incorrect email format').isEmail(),
  body('password', 'Password lenght must be 5 symbols minimum').isLength({min: 5}),
  body('fullName', 'Name lenght must be 3 symbols minimum').isLength({min: 3}),
  body('avatarUrl', 'Avatar must be URL link').optional().isURL()
];

export const loginValidation = [
  body('email', 'Incorrect email format').isEmail(),
  body('password', 'Password lenght must be 5 symbols minimum').isLength({min: 5}),
];

export const todoCreateValidation = [
  body('title', 'Enter the title of the article').isLength({min: 3}).isString(),
  body('note', 'Enter the note of the article').isLength({min: 3}).isString(),
  // body('deadlineId', 'Enter the deadline id').isLength({min: 1}).isString(),
  // body('deadlineAt', 'Enter the deadline number').isNumeric(),
  // body('pomodorosNumber', 'Enter the number of pomodoros').isNumeric(),
  // body('completedPomodors', 'Enter the number of completed pomodoros').isNumeric(),
  // body('pomodoroTime', 'Enter the time of pomodoro').isNumeric(),
  //Дописать проверки тут и в модели
];
