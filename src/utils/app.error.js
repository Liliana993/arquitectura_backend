// clase para errores personalizados
class AppError extends Error {
    constructor(message, statusCode, code) {
        super(message);

        this.name = "AppError";
        this.statusCode = statusCode;
        this.code = code;
    }
}

export default AppError;