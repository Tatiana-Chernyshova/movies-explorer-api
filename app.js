const express = require('express');

const app = express();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const rootRouter = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const corsOptions = require('./utils/corsOptions');

require('dotenv').config();
const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/moviesdb',
} = process.env;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(requestLogger);
app.use(limiter);

app.use('/', rootRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
