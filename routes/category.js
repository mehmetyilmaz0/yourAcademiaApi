const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Models
const Category = require('../models/Category');

router.get('/', (req, res, next) => {
    const promise = Category.aggregate([
        {
            $lookup: {
                from:'articles',
                localField: '_id',
                foreignField: 'categoryId',
                as: 'articles'
            }
        },
        {
            $unwind: {
                path: '$articles',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    title: '$title',
                    content: '$content'
                },
                articles: {
                    $push: '$articles'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                title: '$_id.title',
                content: '$_id.content',
                articles: '$articles'
            }
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

router.get('/:categoryId', (req, res, next) => {
    const promise = Category.aggregate([
        {
          $match: {
              _id: mongoose.Types.ObjectId(req.params.categoryId)
          }
        },
        {
            $lookup: {
                from:'articles',
                localField: '_id',
                foreignField: 'categoryId',
                as: 'articles'
            }
        },
        {
            $unwind: {
                path: '$articles',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    title: '$title',
                    content: '$content'
                },
                articles: {
                    $push: '$articles'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                title: '$_id.title',
                content: '$_id.content',
                articles: '$articles'
            }
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

router.put('/:categoryId', (req, res, next) => {
    const promise = Category.findByIdAndUpdate(
        req.params.categoryId,
        req.body,
        {
            new: true
        }
    );

    promise.then((data) => {
        if(!data)
            next({message: 'This Category was Not Found', code: 1});

        res.json(data)
    }).catch((err) => {
        res.json(err)
    });
});

router.delete('/:categoryId', (req, res, next) => {
   const promise = findByIdAndRemove(req.params.categoryId);

   promise.then((data) => {
       if(!data)
           next({message: 'This Category was Not Found', code: 1});

       res.json({status: 1})
   }).catch((err) => {
       res.json(err)
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
