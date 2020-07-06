const { validation } = require('./errorsName.enum');

/**
 * @exports
 * @extends Error
 */
class ValidationError extends Error {
    /**
     * @constructor
     * @param {object} message
     */
    constructor(message) {
        super();
        this.message = message;
        this.name = validation;
        this.code = 400;
    }
}

module.exports = ValidationError;
