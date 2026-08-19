import sessionService from '../services/sessions.service.js';
import { generateToken } from '../utils/jwt.js';
import { comparePassword } from '../utils/hash.js';
import {UserModel} from '../models/userSchema.js';
import { CurrentUserDTO } from '../dto/current.user.dto.js';

//Endpoint for user registration
export const registerUser = async (req, res) => {
    return res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        payload: {
            id: req.user._id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            role: req.user.role
        }
    });
};

// Endpoint for user login
export const loginUser = async (req, res) => {
     try {
        const user = req.user;

        const tokenUser = {
            id: user._id,
            email: user.email,
            role: user.role
        };

        const token = generateToken(tokenUser);

        res.cookie('currentUser', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        return res.status(200).json({
            status: 'success',
            message: 'Login successful'
        });

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};


// Current
export const getCurrentUser = async (req, res) => {
    try {
        const userDTO = new CurrentUserDTO(req.user);
        return res.status(200).json({
            status: 'success',
            payload: userDTO
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