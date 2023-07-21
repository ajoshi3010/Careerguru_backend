// authMiddleware.js

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: 'Access forbidden. Admin rights required.' });
    }
    next();
};

// Middleware to check if the user is authenticated (optional)
// const isAuthenticated = (req, res, next) => {
//     if (!req.user) {
//         return res.status(401).json({ message: 'Unauthorized. Please log in first.' });
//     }
//     next();
// };

module.exports = {
    isAdmin,
    // isAuthenticated,
};
