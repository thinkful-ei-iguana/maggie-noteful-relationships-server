require('dotenv').config();
const express = require('express');
const notesRouter = require('./Notes/notesRouter');
const foldersRouter = require('./Folders/foldersRouter');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

// Middleware pipeline
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api/folders', foldersRouter);
app.use('/api/notes', notesRouter);


// Error handling functions
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;