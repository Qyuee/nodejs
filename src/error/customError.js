class CustomError extends Error {
    constructor(type, status, message) {
        super(message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }

        this.type = type;
        this.status = status;
    }
}

export {CustomError};