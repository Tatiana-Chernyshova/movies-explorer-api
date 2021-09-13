const corsOptions = {
  origin: [
    'https://mrld.nomoredomains.rocks',
    'http://mrld.nomoredomains.rocks',
    'localhost:3000',
    'http://localhost:3000',
  ],
  credentials: true,
};

module.exports = corsOptions;
