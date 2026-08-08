import sessionService from '../services/sessions.service.js';
import { generateToken } from '../utils/jwt.js';
import { comparePassword } from '../utils/hash.js';
import {UserModel} from '../models/userSchema.js';

//Endpoint for user registration
export const registerUser = async (req, res) => {
    try {
        const user = await sessionService.registerUser(req.body);
        res.status(201).json({
            status: 'success',
            payload: user
        });
    } catch (error) {
        if(error.message === 'Email already in use') {
            res.status(409).json({ status: 'error', message: error.message });
        } else {
            res.status(400).json({ status: 'error', message: error.message });
        }
    }
};

// Endpoint for user login
export const loginUser = async (req, res) => {
    try {
        const {email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({
                 status: 'error', 
                 message: 'Missing required fields' });
        }

        // Normalize email to lowercase and trim whitespace
        const normalizedEmail = email.trim().toLowerCase();

        // Find user by email
        const user = await UserModel.findOne({ email: normalizedEmail });
        if(!user) {
            return res.status(401).json({ 
                status: 'error', 
                message: 'Invalid credentials' });
        }

        // Compare provided password with stored hashed password
        const isPasswordValid = await comparePassword(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ 
                status: 'error', 
                message: 'Invalid credentials' });
        }

        // data to include in the JWT token
        const tokenUser = {
            id: user._id,
            email: user.email,
            role: user.role
        };

        // Generate JWT token for the authenticated user
        const token = generateToken(tokenUser);

        res.cookie('currentUser', token, {
            httpOnly: true, // Cookie is accessible only by the web server
            maxAge: 60 * 60 * 1000, // Cookie expires in 1 hour
        });

        res.status(200).json({
            status: 'success', // Return a success response with the generated token
            message: 'Login successful', // Include a success message
        });

    } catch (error) {
        if(error.message === 'Invalid credentials') {
            // Return a 401 Unauthorized status for invalid credentials
            res.status(401).json({ status: 'error', message: error.message });
        } else {
            // Return a 400 Bad Request status for other errors
            res.status(400).json({ status: 'error', message: error.message });
        }
        // Return a 500 Internal Server Error status for unexpected errors
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};


// Current
export const getCurrentUser = async (req, res) => {
    try {

        return res.status(200).json({
            status: 'success',
            payload: {
                id: req.user.id,
                email: req.user.email,
                role: req.user.role
            }
        });

    } catch (error) {

        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};


// Logout
export const logoutUser = async (req, res) => {
    try {

        res.clearCookie('currentUser');

        return res.status(200).json({
            status: 'success',
            message: 'Sesión cerrada'
        });

    } catch (error) {

        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};