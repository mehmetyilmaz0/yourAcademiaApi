const express = require('express');
const router = express.Router();

//Models
const Article = require('../models/Article');


router.get('/', (req, res, next) => {
    const promise = Article.aggregate([
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryId',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            $unwind: '$category'
        }
    ]).sort({date: -1});

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    });
});

router.get('/top10', (req, res, next) => {
    const promise = Article.find({}).limit(10).sort({favCount: -1});

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    });
});

router.get('/results/:count', (req, res, next) => {
   // const promise = Article.find({}).limit(Number(req.params.count)).sort({date: -1});

    const promise = Article.aggregate([
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryId',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            $unwind: '$category'
        }
    ]).limit(Number(req.params.count)).sort({date: -1});

   promise.then((data) => {
       res.json(data);
   }).catch((err) => {
       res.json(err);
   });
});

router.get('/:articleId', (req, res, next) => {
    const promise = Article.findById(req.params.articleId);

    promise.then((data) => {
        if (!data)
            next({message: 'This Article was Not Found!', code: 1});

        res.json(data);
    }).catch((err) => {
        res.json(err)
    });
});

router.put('/:articleId', (req, res, next) => {
    const promise = Article.findByIdAndUpdate(
        req.params.articleId,
        req.body,
        {
            new: true // guncelleme isleminden sonra response olan datamiz eski datayi donduruyordu.
                    // Bu sekilde guncelleme sonrasindaki datayi dondurmus olacagiz
        }
    );

    promise.then((data) => {
        if (!data)
            next({message: 'This Article was Not Found!', code: 1});

        res.json(data);
    }).catch((err) => {
        res.json(err)
    });
});

router.delete('/:articleId', (req, res, next) => {
    const promise = Article.findByIdAndRemove(req.params.articleId);

    promise.then((data) => {
        if (!data)
            next({message: 'This Article was Not Found!', code: 1});

        res.json({status: 1});
    }).catch((err) => {
        res.json(err)
    });
});

router.post('/', (req, res, next) => {
    const {title, content, categoryId, keywords, favCount, displayCount, source, user, imageUrl} = req.body;

    const article = new Article({
        title: title,
        content: content,
        categoryId: categoryId,
        keywords: keywords,
        favCount: favCount,
        displayCount: displayCount,
        source: source,
        user: user,
        imageUrl: imageUrl
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
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })

});

module.exports = router;
