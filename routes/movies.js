const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
//   putLike,
//   deleteLike,
} = require('../controllers/movies');
// const auth = require('../middlewares/auth');
const validateUrl = require('../validator/validateUrl');

// router.use(auth);
router.get('/', getMovies); // возвращает все сохранённые пользователем фильмы
router.post('/', celebrate({
  body: Joi.object().keys({
    // email: Joi.string().required().min(2).max(30),
    // name: Joi.string().required().min(2).max(30),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(validateUrl),
    trailer: Joi.string().custom(validateUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().custom(validateUrl),
    movieId: Joi.string().required(),
  }),
}), createMovie); // создаёт фильм с переданными в теле
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), deleteMovie); // удаляет сохранённый фильм по id

module.exports = router;
