import {Router} from 'express';
import passport from 'passport';

import {registerUser, loginUser, getCurrentUser, logoutUser} from '../controllers/sessions.controller.js';
import { gitHubCallback } from '../controllers/sessions.controller.js';
import { authorizeRoles } from '../middlewares/authorize.middleware.js';


const router = Router();

router.post('/register', passport.authenticate('register', { session: false }), registerUser);
router.post('/login', passport.authenticate('login', { session: false }), loginUser);
//Router con github
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', {session: false}), gitHubCallback);
//current
router.get('/current', passport.authenticate('current', { session: false }), getCurrentUser);
router.post('/logout', logoutUser);

export default router;