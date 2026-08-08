import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    return await bcrypt.hashSync(password, 10);
};

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compareSync(password, hashedPassword);
}