const { connect, connection } = require('mongoose');
require('dotenv').config();

const connectionString =
  process.env.MONGODB_URI;

connect(connectionString);

module.exports = connection;
