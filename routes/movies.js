const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  validateCreateMovie,
  validateDeleteMovie,
} = require('../validator/validate');


router.get('/', getMovies); // возвращает все сохранённые пользователем фильмы
router.post('/', validateCreateMovie, createMovie); // создаёт фильм с переданными в теле
router.delete('/:movieId', validateDeleteMovie, deleteMovie); // удаляет сохранённый фильм по id

module.exports = router;
