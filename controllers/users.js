const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Error400 = require('../errors/error400');
const Error404 = require('../errors/error404');

const aboutUser = (req, res, next) => {
  const { _id } = req.user;
  return User.findOne({ _id })
    .then((user) => {
      if (!user) {
        throw new Error404('Нет пользователя с таким id');
      }
      res.status(200).send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  return User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .orFail(() => {
      throw new Error404('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new Error400('Переданы некорректные данные при редактировании пользователя'));
      }
      next(err);
    });
};

module.exports = {
  aboutUser,
  updateUser,
};
