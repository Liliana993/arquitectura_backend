import { UserModel } from '../models/userSchema.js';

class UserDao {

    async getUserByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async createUser(userData) {
        return await UserModel.create(userData);
    }
}

export default new UserDao();