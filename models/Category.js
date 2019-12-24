const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: [true, '`{PATH}` Alanı Zorunludur...'],
        minLength: [1, '`{PATH}` Alanının Uzunluğu `{VALUE}` den Küçük Olamaz '],
        maxLength: [100, '`{PATH}` Alanının Uzunluğu `{VALUE}` den Büyük Olamaz '],
    },
    content: {
        type: String,
        required: [true, '`{PATH}` Alanı Zorunludur...'],
        minLength: [1, '`{PATH}` Alanının Uzunluğu `{VALUE}` den Küçük Olamaz '],
        maxLength: [100, '`{PATH}` Alanının Uzunluğu `{VALUE}` den Büyük Olamaz '],
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('category', CategorySchema);
