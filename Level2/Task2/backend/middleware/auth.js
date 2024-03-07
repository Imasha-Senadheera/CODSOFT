const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.authenticateUser = (req, res, next) => {
    // Check if token is provided in the request header
    const token = req.headers.authorization;

    // If token is not provided
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, config.jwtSecret);
        // Attach the user ID to the request object for further use
        req.userId = decoded.userId;
        next(); // Call the next middleware
    } catch (error) {
        // If token is invalid
        return res.status(401).json({ message: 'Invalid token.' });
    }
};
