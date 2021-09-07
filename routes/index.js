const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
// const loginRouter = require('./login');
// const Error404 = require('../errors/error404');

router.use('/', loginRouter);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
// router.use('*', (req, res, next) => {
//   next(new Error404('Запрашиваемый ресурс не найден.'));
// });

module.exports = router;