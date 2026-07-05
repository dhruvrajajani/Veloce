const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    Tittle:String,
    Description:String
})

const notemodle = mongoose.model('Note',schema);

module.exports=notemodle;