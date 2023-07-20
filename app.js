const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const passport=require('./config/Passport')
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/adminroutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/adminroutes', adminRoutes);
app.use('/userRoutes', userRoutes);
app.use(passport.initialize());
const port = 3000;

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.listen(port,()=>{
  console.log("Server is running on port 3000");
})


