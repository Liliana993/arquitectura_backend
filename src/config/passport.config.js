import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github2';
import userDao from '../dao/user.dao.js';
import {comparePassword} from '../utils/hash.js';
import sessionsService from '../services/sessions.service.js';

passport.use('register', new LocalStrategy({
    usernameField: "email",
      passwordField: "password",
      passReqToCallback: true},
    async (req, email, password, done) => {
        try {
            const { first_name, last_name } = req.body;

            if(!first_name || !last_name || !email || !password) {
                return done(null, false, { message: 'All fields are required' });
            }
            //const hashedPassword = await hashPassword(password);

            const newUser = await sessionsService.registerUser({
                first_name,
                last_name, 
                email,
                password
            });


            return done(null, newUser);
        } catch (error) {
            if(error.code === "EMAIL_EXISTS"){
                return done(
                 null,
                 false,
               {
                 message:
                "El email ya está registrado"
                }
              );
            }
            return done(error);
        }
    }
));

//Login strategy
passport.use('login', new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
        try {
            const normalizedEmail = email.toLowerCase().trim();
            
            const user = await userDao.getUserByEmail(normalizedEmail);
            if (!user) {
                return done(null, false, { message: 'Invalid credentials' });
            }
            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                return done(null, false, { message: 'Invalid credentials' });
            }
            return done(null, user);
        } catch (error) {
           //console.error('❌ Error en login strategy:', error);
            return done(error);
        }
    }
));

//GitHub strategy
passport.use('github', new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        scope: ['user:email']
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            //console.log("GitHub profile:", profile);

            const email = profile.emails[0].value.toLowerCase().trim();
            
            if(!email){
                return done(
                    null,
                    false,
                    {
                        message: "GitHub no proporcionó un email"
                    }
                )
            }

            //obtener name y lastName
            const first_name = profile.name?.givenName || profile.displayName || "Usuario";
            const last_name = profile.name?.familyName || "";

            const user = await sessionsService.registerGithubUser({
                first_name,
                last_name,
                email,
                providerId: profile.id
            })

            return done(
                null, 
                user);

        } catch (error) {
             //console.error("Error GitHub:", error);
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
            const user = await userDao.getUserById(token.id);
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));