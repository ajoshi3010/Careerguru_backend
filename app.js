const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const passport=require('./config/Passport')
const authRoutes = require('./routes/auth');
const { isAdmin, isAuthenticated } = require('./middleware/authMiddleware');

// Use the user and admin routes with appropriate middleware
const app = express();
app.use(passport.initialize());
const adminRoutes = require('./routes/adminroutes');
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', isAuthenticated, userRoutes); // For authenticated users
app.use('/api/admin', isAuthenticated, isAdmin, adminRoutes); // For authenticated admins only
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/adminroutes', adminRoutes);
app.use('/userRoutes', userRoutes);
const port = 3000;

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.listen(port,()=>{
  console.log("Server is running on port 3000");
})


