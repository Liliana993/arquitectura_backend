import { UserModel } from "../models/userSchema.js";

class UserDAO {

    async getUserByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async getUserById(id) {
        return await UserModel.findById(id);
    }

    async createUser(userData) {
        return await UserModel.create(userData);
    }
}

export default new UserDAO();