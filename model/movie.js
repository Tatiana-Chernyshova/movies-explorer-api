const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: { // страна создания фильма
    type: String,
    required: true,
    // minlength: 2,
  },
  director: { // режиссёр фильма
    type: String,
    required: true,
    // minlength: 2,
  },
  duration: { // длительность фильма
    type: Number,
    required: true,
    // minlength: 2,
  },
  year: { // год выпуска фильма
    type: String,
    required: true,
    // minlength: 2,
  },
  description: { // описание фильма
    type: String,
    required: true,
    // minlength: 2,
  },
  image: { // ссылка на постер к фильму
    type: String,
    required: true,
  },
  trailer: { // ссылка на трейлер фильма
    type: String,
    required: true,
  },
  thumbnail: { // миниатюрное изображение постера к фильму
    type: String,
    required: true,
  },
  owner: { // _id пользователя, который сохранил фильм.
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
  },
  //проверка
  movieId: { // id фильма, который содержится в ответе сервиса MoviesExplorer
    type: String, //проверка
    required: true,
  },
  nameRU: { // название фильма на русском языке
    type: String,
    required: true,
  },
  nameEN: { // название фильма на английском языке
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
