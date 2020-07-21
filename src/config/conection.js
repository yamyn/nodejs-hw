const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/';
const MONGODB_DB = 'db-contacts';
const MONGO_URI = `${MONGODB_URI}${MONGODB_DB}`;
// console.log(procces.env.MONGODB_URI);

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

module.exports = mongoose.createConnection(MONGO_URI, connectOptions);
