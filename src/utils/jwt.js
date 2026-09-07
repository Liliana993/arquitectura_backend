import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({
        id: user._id.toString(),
        firstName: user.first_name,//modificado para poder recibir el nombre del usuario en el token y pasar el nombre al email de confirmacion de ticket
        email: user.email,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: process.env.expiresIn || "1h"
    }
    );
}

export const verifyToken = token => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET
    );
};