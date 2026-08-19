import User from '../models/userSchema.js';

class UserRepository {

    async getUserByEmail(email) {
        return await User.findOne({ email });
    }

    async getUserById(id) {
        return await User.findById(id);
    }

    async createUser(userData) {
        return await User.create(userData);
    }
}

export default new UserRepository();