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


// country — страна создания фильма. Обязательное поле-строка.
// director — режиссёр фильма. Обязательное поле-строка.
// duration — длительность фильма. Обязательное поле-число.
// year — год выпуска фильма. Обязательное поле-строка.
// description — описание фильма. Обязательное поле-строка.

// image — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
// trailer — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
// thumbnail — миниатюрное изображение постера к фильму. Обязательное поле-строка. Запишите её URL-адресом.

// owner — _id пользователя, который сохранил фильм. Обязательное поле.
// movieId — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
// nameRU — название фильма на русском языке. Обязательное поле-строка.
// nameEN — название фильма на английском языке. Обязательное поле-строка.


  // name: {
  //   type: String,
  //   required: true,
  //   minlength: 2,
  //   maxlength: 30,
  // },
  // link: {
  //   type: String,
  //   required: true,
  // },
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  // },
  // likes: {
  //   type: Array,
  //   default: [],
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});




module.exports = mongoose.model('movie', movieSchema);
