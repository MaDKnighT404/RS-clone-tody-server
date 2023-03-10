import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import {UserModel} from '../models/User.js';

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
  
    const doc = new UserModel({
      email: req.body.email.toLowerCase(),
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });
  
    const user = await doc.save();
    
    const token = jwt.sign({
      _id: user._id
    }, 'secret999', {expiresIn:'30d'}) // исчезнет через 30 дней

    const {passwordHash, ...userData} = user._doc;
    res.json({...userData, token});

  } catch(err) {
    console.log(err)
    res.status(500).json([{
      msg: 'User is already registred'
    }])
  }
}


export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({email: req.body.email.toLowerCase()});

    if (!user) {
      return res.status(404).json([{
        msg: 'User not found',
      }])
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if(!isValidPass) {
      return res.status(400).json ({
        msg: 'Incorrect login or password'
      })
    }

    const token = jwt.sign({
      _id: user._id
    }, 'secret999', {expiresIn:'30d'}) 

    const {passwordHash, ...userData} = user._doc;

    res.json({...userData, token});

  } catch(err) {
    console.log(err)
    res.status(500).json({
      msg: 'Error when login'
    })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    
    if(!user) {
      return res.status(404).json({
        msg: 'User not found'
      })
    }

    const {passwordHash, ...userData} = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: 'Access is denied'
    })
  }
}

