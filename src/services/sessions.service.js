import userRepository from '../repositories/user.repository.js';
import { hashPassword } from '../utils/hash.js';

class SessionService {

    async registerUser(userData) {
    const { first_name, last_name, email, password } = userData;

    if (!first_name || !last_name || !email || !password) {
        throw new Error("Missing required fields");
    }

    const emailNormalized = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailNormalized)) {
        throw new Error("Invalid email format");
    }

    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }

    const existingUser =
        await userRepository.getUserByEmail(emailNormalized);

    if (existingUser) {
        throw new Error("Email already in use");
    }

    const hashedPassword = await hashPassword(password);

    const user = await userRepository.createUser({
        first_name,
        last_name,
        email: emailNormalized,
        password: hashedPassword,
        role: "user"
    });

    return {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
    };
}

   async registerGithubUser({
    first_name,
    last_name,
    email,
    providerId
}) {
    const normalizedEmail = email.trim().toLowerCase();

    // Buscamos el usuario
    let user = await userRepository.getUserByEmail(normalizedEmail);

    // Si existe, lo retorna
    if (user) {
        return user;
    }

    // Si no existe, lo crea
    user = await userRepository.createUser({
        first_name,
        last_name,
        email: normalizedEmail,
        role: "user",
        provider: "github",
        providerId
    });

    return user;
}

}

export default new SessionService();