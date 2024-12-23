const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    User:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('note', NotesSchema);