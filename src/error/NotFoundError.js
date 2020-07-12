const { notfound } = require('./errorsName.enum');

/**
 * @exports
 * @extends Error
 */
class NotFoundError extends Error {
    /**
     * @constructor
     * @param {object} message
     */
    constructor(message) {
        super();
        this.message = message;
        this.name = notfound;
        this.code = 404;
    }
}

module.exports = NotFoundError;
