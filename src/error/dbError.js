class DbError extends Error {
    constructor(type = "DB", status = 500, message) {
        super(message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DbError);
        }

        this.type = type;
        this.status = status;
    }
}

export {DbError};