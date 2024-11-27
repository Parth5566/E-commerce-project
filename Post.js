const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    User: {
        type: String,
        required: true,
      },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Post', postSchema);