const { duplicateKey } = require('./errorsName.enum');

/**
 * @exports
 * @extends Error
 */
class DupKeyError extends Error {
    /**
     * @constructor
     * @param {object} message
     */
    constructor(message) {
        super();
        this.message = message;
        this.name = duplicateKey;
        this.code = 409;
    }
}

module.exports = DupKeyError;
