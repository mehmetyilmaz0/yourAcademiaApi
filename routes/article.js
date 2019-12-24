const express = require('express');
const router = express.Router();

/* GET articles listing. */
router.get('/', (req, res, next) => {
  res.send({status: 1});
});

module.exports = router;
