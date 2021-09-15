const Movie = require('../model/movie');
const Error400 = require('../errors/error400');
const Error403 = require('../errors/error403');
const Error404 = require('../errors/error404');

const getMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((movie) => {
    res.status(200)
      .send({ movie });
  })
  .catch((err) => {
    next(err);
  });

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const { _id } = req.user;
  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: _id,
  })

    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new Error400('Переданы некорректные данные при создании фильма'),
        );
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById({ _id: req.params.movieId })
    .orFail(() => {
      throw new Error404('Запрашиваемый фильм не найден');
    })
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        throw new Error403('Нельзя удалить чужой фильм');
      }
      return movie.remove()
        .then(() => res.status(200).send({ message: `Фильм с id ${movie.id} успешно удален!` }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new Error400('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
