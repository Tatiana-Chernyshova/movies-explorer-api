const router = require('express').Router();
const {
  createUser,
  login,
} = require('../controllers/users');
const {
  validateLogin,
  validateCreateUser,
} = require('../validator/validate');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

module.exports = router;
