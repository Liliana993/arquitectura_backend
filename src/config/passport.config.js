import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../models/userSchema.js';
import {hashPassword, comparePassword} from '../utils/hash.js';

passport.use('register', new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    async (req, email, password, done) => {
        try {
            const { first_name, last_name } = req.body;

            if(!first_name || !last_name || !email || !password) {
                return done(null, false, { message: 'All fields are required' });
            }

            const normalizedEmail = email.toLowerCase().trim();
            const existingUser = await UserModel.findOne({ email: normalizedEmail });
            if (existingUser) {
                return done(null, false, { message: 'Email already in use' });
            }

            const hashedPassword = await hashPassword(password);

            const newUser = new UserModel({
                first_name,
                last_name, 
                email: normalizedEmail, 
                password: hashedPassword,
                role: 'user' 
            });

            const savedUser = await newUser.save();

            return done(null, newUser);
        } catch (error) {
            return done(error);
        }
    }
));

//Login strategy
passport.use('login', new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const normalizedEmail = email.toLowerCase().trim();
            
            const user = await UserModel.findOne({ email: normalizedEmail });
            if (!user) {
                return done(null, false, { message: 'Invalid credentials' });
            }
            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                return done(null, false, { message: 'Invalid credentials' });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

//extraer token de la cookie
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['currentUser'];
    }
    return token;
};

//JWT strategy
passport.use('current', new JwtStrategy(
    { jwtFromRequest: cookieExtractor, secretOrKey: process.env.JWT_SECRET },
    async (token, done) => {
        try {
            const user = await UserModel.findById(token.id);
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));