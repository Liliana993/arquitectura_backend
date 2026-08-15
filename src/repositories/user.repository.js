import UserDao from '../dao/user.dao.js';

class UserRepository {

    async getUserByEmail(email) {
        return await UserDao.getUserByEmail(email);
    }

    async getUserById(id) {
        return await UserDao.getUserById(id);
    }

    async createUser(userData) {
        return await UserDao.createUser(userData);
    }
}

export default new UserRepository();