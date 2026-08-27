import userRepository from '../repositories/user.repository.js';

class UserDao {

    async getUserByEmail(email) {
        return await userRepository.getUserByEmail({ email });
    }

    async getUserById(id) {
        return await userRepository.getUserById(id);
    }

    async createUser(userData) {
        return await userRepository.createUser(userData);
    }
}

export default new UserDao();