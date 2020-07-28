const Validator = require('../Validation');
const { subscriptionEnum } = require('./enums');

class UsersValidator extends Validator {
    constructor() {
        super();
    }

    createUserValidation(data) {
        const shema = this.Joi.object()
            .keys({
                password: this.Joi.string()
                    .pattern(/^[a-zA-Z ]{3,20}$/)
                    .trim()
                    .required(),
                email: this.Joi.string().trim().email().required(),
                subscription: this.Joi.string().valid(
                    ...Object.values(subscriptionEnum),
                ),
            })
            .required();

        return this.createValidation(shema)(data);
    }

    updateUserValidation(data) {
        const shema = this.Joi.object()
            .keys({
                subscription: this.Joi.string()
                    .valid(...Object.values(subscriptionEnum))
                    .required(),
            })
            .required();

        return this.updateValidation(shema)(data);
    }
}

module.exports = new UsersValidator();
