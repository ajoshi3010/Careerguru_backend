const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const passport=require('./config/Passport')
const authRoutes = require('./routes/auth');
const app = express();
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/adminroutes', authRoutes);
app.use('/userRoutes', authRoutes);
app.use(passport.initialize());
const port = 3000;

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.listen(port,()=>{
  console.log("Server is running on port 3000");
})


