import {Router} from 'express';
import {registerUser, loginUser, getCurrentUser, logoutUser} from '../controllers/sessions.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import passport from 'passport';

const router = Router();

router.post('/register', passport.authenticate('register', { session: false }), registerUser);
router.post('/login', passport.authenticate('login', { session: false }), loginUser);
router.get('/current', passport.authenticate('current', { session: false }), getCurrentUser);
router.post('/logout', logoutUser);

export default router;