const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const passport=require('./config/Passport')
const authRoutes = require('./routes/auth');
const { isAdmin } = require('./middleware/authMiddleware');

// Use the user and admin routes with appropriate middleware
const app = express();
app.use(cors());
app.use(passport.initialize());
const adminRoutes = require('./routes/adminroutes');
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes); // For authenticated users
app.use('/api/admin',  isAdmin, adminRoutes); // For authenticated admins only
app.use(bodyParser.json());
app.use('/auth', authRoutes);
// app.use('/adminroutes', adminRoutes);
// app.use('/userRoutes', userRoutes);
const port = 5000;

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.listen(port,()=>{
  console.log("Server is running on port 5000");
})


