import {TodoModel} from '../models/Todo.js';

export const getAll = async (req, res) => {
  try {
    const todos = await TodoModel.find().populate('user').exec();
    res.json(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error when getting all todos',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const todoId = req.params.id;
    TodoModel.findOne(
      {
        _id: todoId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Error when get one todo',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Error todo not found',
          });
        }

        res.json(doc);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error when getting a todo',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const todoId = req.params.id;
    TodoModel.findOneAndDelete({
      _id:todoId
    }, (err, doc) => {
      if(err) {
        console.log(err);
        res.status(500).json({
          message: 'Error when deleting todo',
        });
      }

      if(!doc) {
        return res.status(404).json({
          message: 'Error todo not found',
        });
      }

      res.json({
        success: true,
      })
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error when deleting todo',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new TodoModel({
      title: req.body.title,
      text: req.body.text,
      user: req.userId,
    });

    const todo = await doc.save();

    res.json(todo);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error when create todo',
    });
  }
};

export const update = async(req, res) => {
  try {
    const todoId = req.params.id

    await TodoModel.updateOne({
      _id: todoId,
    }, {
      title: req.body.title,
      text: req.body.text,
      user: req.userId,
    })

    res.json({
      success: true
    })
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: 'Error when update todo',
    });
  }
}