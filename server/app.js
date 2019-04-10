const express = require('express');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');

const app = express();
app.use(morgan('dev'));

const staticPath = `${__dirname}/../public`;
app.use('/books/:id', express.static(staticPath));

app.use(
  '/books/:id/details',
  proxy({ target: 'http://localhost:3001', changeOrigin: true }),
);

// hannah-service
app.use(
  '/books/:id/reviews',
  proxy({ target: 'http://localhost:3003', changeOrigin: true }),
);

// kaz-service
app.use(
  '/books/:id/info',
  proxy({ target: 'http://localhost:3002', changeOrigin: true }),
);

module.exports = app;
