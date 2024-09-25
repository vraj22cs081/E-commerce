const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const createError = require('http-errors');
require('dotenv').config(); // Load environment variables from .env

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const adminRouter = require('./routes/admin');
const orderRouter = require('./routes/order');
const invoiceRoute = require('./routes/invoice');
const isAuthenticated = require('./routes/authMiddleware'); 

const sessionSecret = process.env.SESSION_SECRET;
const corsOrigin = process.env.CORS_ORIGIN;
const port = process.env.PORT || 9000; // Default to 9000 if not set in .env

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

app.use(logger('dev'));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); 

// Session middleware should be set up before the routes
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: app.get('env') === 'production' }
}));

// CORS middleware for development/production
app.use(cors({
  origin: corsOrigin,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter); 
app.use('/admin', adminRouter);
app.use('/order', orderRouter);
app.use('/order', invoiceRoute);

// Protected routes
app.get('/homepage', isAuthenticated, (req, res) => {
  res.send('Homepage - Protected');
});

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
