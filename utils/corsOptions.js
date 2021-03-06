const corsOptions = {
  origin: [
    'https://cherduk-movies.nomoredomains.club',
    'http://cherduk-movies.nomoredomains.club',
    'https://nomoreparties.co/beatfilm-movies',
    'http://nomoreparties.co/beatfilm-movies',
//    'localhost:3000',
    'http://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Accept'],
  credentials: true,
};
