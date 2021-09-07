const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  aboutUser, updateUser, 
} = require('../controllers/users');
// const auth = require('../middlewares/auth');


// router.use(auth);
// router.get('/', getUsers);
router.get('/me', aboutUser); // возвращает информацию о пользователе (email и имя)

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateUser); // обновляет информацию о пользователе (email и имя)


module.exports = router;
