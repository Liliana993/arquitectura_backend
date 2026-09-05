import userDao from '../dao/user.dao.js';
//import userRepository from '../repositories/user.repository.js';
import { hashPassword } from '../utils/hash.js';

class SessionService {

    async registerUser(userData) {
    const {first_name, last_name, email, password} = userData;

    if(!first_name || !last_name || !email || !password) {
        throw new Error('Missing required fields');
    }
    
    const emailNormalized = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailNormalized)) {
        throw new Error('Invalid email format');
    }

    if(password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
    }

    const existingUser = await userDao.getUserByEmail(emailNormalized);
    if(existingUser) {
        throw new Error('Email already in use');
    }

    const hashedPassword = await hashPassword(password);

    const user = await userDao.createUser({
        first_name,
        last_name,
        email: emailNormalized,
        password: hashedPassword
    });

    return {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
    }
   }

   async registerGithubUser({
    first_name,
    last_name,
    email,
    providerId
   }){
    const normalizedEmail = email.trim().toLowerCase();
    //console.log("2. Email normalizado:", normalizedEmail);
    //Buscamos el usuario
    let user = await userDao.getUserByEmail(normalizedEmail);
     //console.log("3. Usuario existente:", user);
    //si existe lo retorna
    if(user){
        return user;
    }

    //si no existe lo crea
    user = await userDao.createUser({
        first_name,
        last_name,
        email: normalizedEmail,
        role: "user",
        provider: "github",
        providerId
    });
    //console.log("4. Usuario creado:", user);
    
    return user;
   }

}

export default new SessionService();