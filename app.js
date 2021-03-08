var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');

const { UploadDIR, createUploadDirIfNotExists } = require('./helpers');
createUploadDirIfNotExists();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static(path.join(__dirname, 'react/build')));

app.use(fileUpload());

app.post('/upload', (req, res, next) => {
  let imageFile = req.files.file;

  imageFile.mv(`${UploadDIR}/${req.body.filename}`, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({ files: fs.readdirSync(UploadDIR) });
  });
});

app.get('/file-list', (req, res) => {
  res.json({ files: fs.readdirSync(UploadDIR) });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
