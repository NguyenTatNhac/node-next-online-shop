import express from 'express';

var router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    message: 'Hello World'
  });
});

export default router;
