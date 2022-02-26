
class ExtendableError extends Error {
    constructor(message, statusCode) {
        if (new.target === ExtendableError)
            throw new TypeError('Abstract class "ExtendableError" cannot be instantiated directly.');
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.contructor);
    }
}

// 400 Bad Request
class BadRequest extends ExtendableError {
    constructor(m, statusCode = 400) {
        if (arguments.length === 0)
            super('bad request', statusCode);
        else
            super(m, statusCode);
    }
}

// 401 Unauthorized
class Unauthorized extends ExtendableError {
    constructor(m, statusCode = 401) {
        if (arguments.length === 0)
            super('unauthorized', statusCode);
        else
            super(m, statusCode);
    }
}

// 404 Not Found
class NotFound extends ExtendableError {
    constructor(m, statusCode = 404) {
        if (arguments.length === 0)
            super('not found', statusCode);
        else
            super(m, statusCode);
    }
}

module.exports = {
    BadRequest,
    Unauthorized,
    NotFound
}
