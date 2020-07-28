const { unauthorized } = require('./errorsName.enum');

/**
 * @exports
 * @extends Error
 */
class UnauthorizedError extends Error {
    /**
     * @constructor
     * @param {object} message
     */
    constructor(message) {
        super();
        this.message = message;
        this.name = unauthorized;
        this.code = 401;
    }
}

module.exports = UnauthorizedError;
