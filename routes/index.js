const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const User = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {title: 'Express'});
});

router.post('/register', (req, res, next) => {
    const {username, password} = req.body;

    bcrypt.hash(password, 8, (err, hash) => { // sifrelenmis password
        const user = new User({
            username: username,
            password: hash
        });

        const promise = user.save();
        promise.then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        });

    });
});

router.post('/authenticate', (req, res, next) => {
    const {username, password} = req.body;

    User.findOne({
        username: username
    }, (err, user) => {
        if (err)
            throw err;

        if (!user) {
            res.json({
                status: false,
                message: 'authentication failed, user not found'
            })
        } else {
            bcrypt.compare(password, user.password).then((result) => {

              if(!result) {
                res.json({
                  status: false,
                  message: 'authentication failed, password is wrong'
                })
              } else {
                const payload = { // token da tasinacak bilgi
                  username: username
                }

                const token = jwt.sign(payload, req.app.get('api_secret_key'), {expiresIn: 720});
                res.json({
                  status: true,
                  token: token
                });

              }
            });
        }
    });
});

module.exports = router;
