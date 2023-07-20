const config=require('../config')
const mongoose = require('mongoose');
const connectDB = async () => {
    try {
      await mongoose.connect(config.mongodbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to the database');
    } catch (error) {
      console.error('Database connection error:', error);
    }
  };
  
  module.exports = connectDB;