var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/product');
var mongooseRouter = require("./routes/mongoose");

//Using cors to avois CORS restrictions during an API call
const cors = require('cors'); 

const app = express();

// Use CORS middleware
app.use(cors({
  origin: '*', // Allow all origins (this is for development, be cautious with this setting in production)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/mongoose', mongooseRouter);

module.exports = app;
