const express = require('express');
const router = express.Router();

//Models
const Article = require('../models/Article');


router.get('/', (req, res, next) => {
    res.json({status: 1});
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
