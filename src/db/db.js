const mongoose = require('mongoose');

const connectDb = async () => {
    await mongoose.connect('mongodb+srv://Dhruvraj:2004@practice.f7mbend.mongodb.net/?appName=Practice/practice');
    console.log("MongoDb connectd");
}

module.exports = connectDb;