export const errorHandler = (err, req, res, next) => {
    const status = err.statusCode || 500;

    res.status(status).json({
        status: "error",
        code: err.code || "INTERNAL_SERVER_ERROR",
        message: err.message || "Internal server error"
    });
};