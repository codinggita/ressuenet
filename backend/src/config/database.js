const mongoose = require('mongoose');

let isConnected = false;

async function connectDatabase() {
  if (isConnected) {
    return mongoose.connection;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is missing. Add it before starting the backend.');
  }

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
  });

  isConnected = true;
  console.log('Connected to MongoDB');
  return mongoose.connection;
}

module.exports = connectDatabase;
