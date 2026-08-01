import sessionService from '../services/sessions.service.js';

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