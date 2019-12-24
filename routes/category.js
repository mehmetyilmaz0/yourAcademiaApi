const express = require('express');
const router = express.Router();

//Models
const Category = require('../models/Category');

router.get('/', (req, res, next) => {
    res.json({ title: 'Express' });
});

module.exports = router;
