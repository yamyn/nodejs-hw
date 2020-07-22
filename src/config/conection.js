const mongoose = require('mongoose');

const MONGO_URI = `${process.env.MONGODB_URI}${process.env.MONGODB_DB}`;

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

module.exports = mongoose.createConnection(MONGO_URI, connectOptions);
