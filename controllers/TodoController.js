import {TodoModel} from '../models/Todo.js';

export const getAll = async (req, res) => {
  try {
    const todos = await TodoModel.find().populate('user').exec();
    res.json(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'Error when getting all todos',
    });
  }
};

export const getAllForUser = async (req, res) => {
  try {
    const todos = await TodoModel.find().populate('user').exec();

    const newTodos = todos.filter(todo => todo.user.email === req.body.email)

    res.json(newTodos);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'Error when getting all todos',
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
            msg: 'Error when get one todo',
          });
        }

        if (!doc) {
          return res.status(404).json({
            msg: 'Error todo not found',
          });
        }

        res.json(doc);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'Error when getting a todo',
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
          msg: 'Error when deleting todo',
        });
      }

      if(!doc) {
        return res.status(404).json({
          msg: 'Error todo not found',
        });
      }

      res.json({
        success: true,
      })
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'Error when deleting todo',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new TodoModel({
      title: req.body.title,
      user: req.userId,
      isCompleted: req.body.isCompleted,
      deadlineAt: req.body.deadlineAt,
      pomodorosNumber: req.body.pomodorosNumber,
      pomodoroTime: req.body.pomodoroTime,
      completedPomodors: req.body.completedPomodors,
    });

    const todo = await doc.save();

    res.json(todo);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'Error when create todo',
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
      isCompleted: req.body.isCompleted,
      deadlineAt: req.body.deadlineAt,
      note: req.body.note,
      pomodorosNumber: req.body.pomodorosNumber,
      pomodoroTime: req.body.pomodoroTime,
      completedPomodors: req.body.completedPomodors,
      user: req.userId,
    })

    res.json({
      success: true
    })
  } catch (error) {
    console.log(err);
    res.status(500).json({
      msg: 'Error when update todo',
    });
  }
}