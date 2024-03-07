const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: 'User signed up successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        // Compare passwords
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        // Create and send JWT token
        const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
