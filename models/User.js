const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, '`{PATH}` Alanı Zorunludur...'],
        minLength: [1, '`{PATH}` Alanının Uzunluğu `{VALUE}` den Küçük Olamaz '],
        unique: true
    },
    password: {
        type: String,
        required: [true, '`{PATH}` Alanı Zorunludur...'],
        minLength: [5, '`{PATH}` Alanının Uzunluğu `{VALUE}` den Küçük Olamaz '],
    }

});

module.exports = mongoose.model('user', UserSchema);
