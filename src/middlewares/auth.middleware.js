import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.currentUser;

        //console.log("COOKIE:", token);

        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "No autenticado"
            });
        }

        const decoded = verifyToken(token);

        //console.log("TOKEN DECODIFICADO:", decoded);

        req.user = decoded;

        return next();

    } catch (error) {
        //console.error("ERROR JWT:", error);

        return res.status(401).json({
            status: "error",
            message: "No autenticado"
        });
    }
};