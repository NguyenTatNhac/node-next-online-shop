import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

import indexRouter from './routes/index';
import usersRouter from './routes/users';

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 error
app.use((req, res, next) => {
  res.sendStatus(404);
});

export default app;
