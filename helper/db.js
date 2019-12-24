const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://admin:admin123@ds237308.mlab.com:37308/heroku_ks74tg0d', {useMongoClient: true});
    mongoose.connection.on('open', () => {
        console.log('MONGODB: Connected...');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MONGODB: Error : ', err );
    });
};