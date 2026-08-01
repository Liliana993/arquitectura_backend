import userDao from '../dao/user.dao.js';

class UserRepository {

    async getUserByEmail(email) {
        return await userDao.getUserByEmail(email);
    }

    async createUser(userData) {
        return await userDao.createUser(userData);
    }
}

export default new UserRepository();