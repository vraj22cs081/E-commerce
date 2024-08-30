const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const createError = require('http-errors');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const adminRouter = require('./routes/admin');
const orderRouter = require('./routes/order');
const invoiceRoute = require('./routes/invoice');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));


// Session middleware should be set up before the routes
app.use(session({
  key: 'session_cookie_name',
  secret: 'vraj',
  resave: false,
  saveUninitialized: true, 
  cookie: { 
    secure: false, // Set to true if using HTTPS
    httpOnly: true, // Helps prevent XSS attacks
    path: '/', // Ensure this is set to '/'
    sameSite: 'lax', // Optional but helps with cross-site requests
    maxAge: 24 * 60 * 60 * 1000 
  }
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); 

let loggedInUserId = null;
let loggedInUserId1 = null;


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/admin', adminRouter);
app.use('/order', orderRouter);
app.use('/order', invoiceRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
