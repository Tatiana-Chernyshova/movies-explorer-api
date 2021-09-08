const Movie = require("../model/movie");
const Error400 = require("../errors/error400");
// const Error403 = require('../errors/error403');
// const Error404 = require('../errors/error404');

// const getMovies = (req, res, next) => Movie.find({})
//   .then((movies) => res.status(200).send(movies))
//   .catch((err) => next(err));

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
  } = req.body; // получим из объекта запроса имя и описание пользователя
  // res.send(req.user)
  // const { country, director } = req.body; // получим из объекта запроса имя и описание пользователя
  const { _id } = req.user;
  // return Movie.create({ name, link, owner: _id })
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
      if (err.name === "ValidationError") {
        next(
          new Error400("Переданы некорректные данные при создании фильма")
        );
      }
      next(err);
    });
};

// const deleteMovie = (req, res, next) => {
//   Movie.findById({ _id: req.params.movieId })
//     .orFail(() => {
//       throw new Error404('Запрашиваемая карточка не найдена');
//     })
//     .then((movie) => {
//       if (req.user._id !== movie.owner.toString()) {
//         throw new Error403('Нельзя удалить чужую карточку');
//       }
//       movie.remove();
//       res.status(200)
//         .send({ message: `Карточка с id ${movie.id} успешно удалена!` });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new Error400('Переданы некорректные данные'));
//       }
//       next(err);
//     });
// };

// const putLike = (req, res, next) => Movie.findByIdAndUpdate(
//   req.params.movieId,
//   { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
//   { new: true },
// )
//   .orFail(() => {
//     throw new Error404('Запрашиваемая карточка не найдена');
//   })
//   .then((movie) => res.send(movie))
//   .catch((err) => {
//     if (err.name === 'CastError') {
//       next(new Error400('Переданы некорректные данные для постановки лайка'));
//     }
//     next(err);
//   });

// const deleteLike = (req, res, next) => Movie.findByIdAndUpdate(
//   req.params.movieId,
//   { $pull: { likes: req.user._id } },
//   { new: true },
// )
//   .orFail(() => {
//     throw new Error404('Запрашиваемая карточка не найдена');
//   })
//   .then((movie) => res.send(movie))
//   .catch((err) => {
//     if (err.name === 'CastError') {
//       next(new Error400('Переданы некорректные данные для снятия лайка'));
//     }
//     next(err);
//   });

module.exports = {
  // getMovies,
  createMovie,
  // deleteMovie,
  // putLike,
  // deleteLike,
};
