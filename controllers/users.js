const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Error400 = require('../errors/error400');
const Error401 = require('../errors/error401');
const Error404 = require('../errors/error404');
const Error409 = require('../errors/error409');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const aboutUser = (req, res, next) => {
  const { _id } = req.user;
  return User.findOne({ _id })
    .then((user) => {
      if (!user) {
        throw new Error404('Нет пользователя с таким id');
      }
      res.status(200).send({
        user: {
          email: user.email,
          name: user.name,

        },
      });
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
      if (err.name === 'ValidationError') {
        next(new Error400('Переданы некорректные данные при редактировании пользователя'));
      } else if (err.code === 11000) {
        next(new Error409('Данный email уже зарегистрирован'));
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  // получим из объекта запроса имя и описание пользователя
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => res.status(200).send({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Error400('Переданы некорректные данные при создании пользователя'));
      } else if (err.name === 'MongoError' || err.code === 11000) {
        next(new Error409('Данный email уже зарегистрирован'));
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Error401('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Error401('Неправильные почта или пароль');
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET
          : 'some-secret-key',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(next);
};

module.exports = {
  aboutUser,
  updateUser,
  createUser,
  login,
};
