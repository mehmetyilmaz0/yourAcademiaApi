const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
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
    categoryId: {
        type: Schema.Types.ObjectId,
    },
    keywords: {
        type: String,
        required: [true, '`{PATH}` Alanı Zorunludur...'],
        minLength: [1, '`{PATH}` Alanının Uzunluğu `{VALUE}` den Küçük Olamaz '],
        maxLength: [100, '`{PATH}` Alanının Uzunluğu `{VALUE}` den Büyük Olamaz '],
    },
    favCount: {
        type: Number,
        required: [true, '`{PATH}` Alanı Zorunludur...'],
        default: 0
    },
    displayCount: {
        type: Number,
        required: [true, '`{PATH}` Alanı Zorunludur...'],
        default: 0
    },
    source: {
        type: String,
        required: [true, '`{PATH}` Alanı Zorunludur...'],
        minLength: [1, '`{PATH}` Alanının Uzunluğu `{VALUE}` den Küçük Olamaz '],
        maxLength: [300, '`{PATH}` Alanının Uzunluğu `{VALUE}` den Büyük Olamaz '],
    },
    user: {
        type: String,
        required: [true, '`{PATH}` Alanı Zorunludur...'],
        minLength: [1, '`{PATH}` Alanının Uzunluğu `{VALUE}` den Küçük Olamaz '],
        maxLength: [100, '`{PATH}` Alanının Uzunluğu `{VALUE}` den Büyük Olamaz '],
    },
    date: {
        type: Date,
        default: Date.now
    },
    imageUrl: {
        type: String,
        required: [true, '`{PATH}` Alanı Zorunludur...'],
        minLength: [1, '`{PATH}` Alanının Uzunluğu `{VALUE}` den Küçük Olamaz '],
        maxLength: [300, '`{PATH}` Alanının Uzunluğu `{VALUE}` den Büyük Olamaz '],
        default: 'https://picsum.photos/750/1260',
    },

});

module.exports = mongoose.model('article', ArticleSchema);
