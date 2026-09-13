//import sessionService from '../services/sessions.service.js';
import { generateToken } from '../utils/jwt.js';
import { CurrentUserDTO } from '../dto/current.user.dto.js';
import {UserDTO} from '../dto/user.dto.js';

//Endpoint for user registration
export const registerUser = async (req, res) => {
    const userDTO = new UserDTO(req.user);
    return res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        payload: userDTO
    });
};


// Endpoint for user login
export const loginUser = async (req, res, next) => {
     try {
       
        const user = req.user;

        const token = generateToken(user);
        //console.log('✅ JWT generado');

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
        //console.error('❌ ERROR EN LOGIN CONTROLLER:', error);
        return next(error);
    }
};

//endpoint login with GitHub
export const gitHubCallback = async (req, res, next) => {
    try {
        //console.log("GitHub req.user:", req.user);

        const token = generateToken(req.user);

        //console.log("JWT generado correctamente");

        res.cookie('currentUser', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        return res.status(200).json({
            status: 'success',
            message: 'Login with GitHub successful'
        });

    } catch (error) {
        //console.error("❌ ERROR EN GITHUB CALLBACK:", error);
        return next(error);
    }
};


// Current
export const getCurrentUser = async (req, res, next) => {
    try {
        const userDTO = new CurrentUserDTO(req.user);
        return res.status(200).json({
            status: 'success',
            payload: userDTO
        });

    } catch (error) {

        return next(error);
    }
};


// Logout
export const logoutUser = async (req, res, next) => {
    try {

        res.clearCookie('currentUser');

        return res.status(200).json({
            status: 'success',
            message: 'Sesión cerrada'
        });

    } catch (error) {
        return next(error);
    }
};
