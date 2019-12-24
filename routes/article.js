const express = require('express');
const router = express.Router();

//Models
const Article = require('../models/Article');


router.get('/', (req, res, next) => {
    const promise = Article.find({});

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    });
});

router.get('/:articleId', (req, res, next) => {
    const promise = Article.findById(req.params.articleId);

    promise.then((data) => {
        if(!data)
            next({message: 'This Article was Not Found!', code: 1});

        res.json(data);
    }).catch((err) => {
        res.json(err)
    });
});

router.post('/', (req, res, next) => {
    const {title, content, keywords, favCount, displayCount, source, user} = req.body;

    const article = new Article({
        title: title,
        content: content,
        keywords: keywords,
        favCount: favCount,
        displayCount: displayCount,
        source: source,
        user: user
    });
    /* DB Save Method -1

      article.save((err, data) => {
        if(err)
          res.json(err);

        res.json(data);
      });
    */

// DB Save Method -2
    const promise = article.save();
    promise.then((data) => {
        res.json({status: 1});
    }).catch((err) => {
        res.json(err);
    })

});

module.exports = router;
