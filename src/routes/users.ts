import express from 'express';

const router = express.Router()

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({
    users: 'Nhac Tat Nguyen'
  });
});

export default router;
