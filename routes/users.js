const router = require('express').Router();
const {
  aboutUser, updateUser,
} = require('../controllers/users');
const {
  validateUpdateUser,
} = require('../validator/validate');

router.get('/me', aboutUser); // возвращает информацию о пользователе (email и имя)
router.patch('/me', validateUpdateUser, updateUser); // обновляет информацию о пользователе (email и имя)

module.exports = router;
