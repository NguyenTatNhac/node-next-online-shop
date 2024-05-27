import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

import indexRouter from './src/routes/index';
import usersRouter from './src/routes/users';
import productsRouter from './src/routes/products';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// catch 404 error
app.use((_req, res) => {
  res.sendStatus(404);
});

export default app;
