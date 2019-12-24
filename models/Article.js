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
    },
    keywords: {
        type: String,
        required: true
    },
    favCount: {
        type: Number,
        required: true,
        default: 0
    },
    displayCount: {
        type: Number,
        required: true,
        default: 0
    },
    source: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('article', ArticleSchema);
