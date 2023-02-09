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
  body('text', 'Enter the text of the article').isLength({min: 3}).isString(),
  //Дописать проверки тут и в модели
];
