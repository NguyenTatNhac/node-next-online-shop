import express from 'express';

var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({
    users: 'Nhac Tat Nguyen'
  });
});

export default router;
