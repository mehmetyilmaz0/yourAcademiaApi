const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,

    },
    keywords: {
        type: String,
        required: true
    },
    favCount: {
        type: Number,
        required: true
    },
    displayCount: {
        type: Number,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    creater: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('article', ArticleSchema);
