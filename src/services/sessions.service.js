import userRepository from '../repositories/user.repository.js';
import { hashPassword } from '../utils/hash.js';
import AppError from '../utils/app.error.js';

class SessionService {

    async registerUser(userData) {
    const { first_name, last_name, email, password } = userData;

    if (!first_name || !last_name || !email || !password) {
        throw new AppError(
            "Missing required fields",
            400,
            "MISSING_REQUIRED_FIELDS"
        );
    }

    const emailNormalized = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailNormalized)) {
        throw new AppError(
        "Invalid email format",
        400,
        "INVALID_EMAIL_FORMAT"
    );
    }

    if (password.length < 6) {
        throw new AppError(
            "Password must be at least 6 characters long",
            400,
            "INVALID_PASSWORD_LENGTH"
        );
    }

    const existingUser =
        await userRepository.getUserByEmail(emailNormalized);

    if (existingUser) {
        throw new AppError(
        "Email already in use",
        409,
        "EMAIL_ALREADY_EXISTS"
        );
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