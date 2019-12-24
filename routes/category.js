const express = require('express');
const router = express.Router();

//Models
const Category = require('../models/Category');

router.get('/', (req, res, next) => {
    const promise = Category.find({});

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

router.post('/', (req, res, next) => {
    const {title, content} = req.body;

    const category = new Category({
        title: title,
        content: content
    });

    const promise = category.save();
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })

});

module.exports = router;
