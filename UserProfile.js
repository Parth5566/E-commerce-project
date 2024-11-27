const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const userProfileSchema= new Schema({
    User:{type:[[String]]},
    name:{type:String,required:true},
    uploaded_Image:{
        type:[[String]],
        required:true
    }});

module.exports = mongoose.model('UserProfile', userProfileSchema);