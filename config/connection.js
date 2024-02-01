const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // Invoke the config method to load environment variables

const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString);

module.exports = mongoose.connection;
