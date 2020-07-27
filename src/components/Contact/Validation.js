const Validator = require('../Validation');

class ContactsValidator extends Validator {
    constructor() {
        super();
    }

    createContactValidation(data) {
        const shema = this.Joi.object()
            .keys({
                name: this.Joi.string()
                    .pattern(/^[a-zA-Z ]{3,20}$/)
                    .trim()
                    .required(),
                email: this.Joi.string().trim().email().required(),
                phone: this.Joi.string()
                    .pattern(/^[0-9]{10}$/)
                    .required(),
            })
            .required();

        return this.createValidation(shema)(data);
    }

    updateContactValidation(data) {
        const shema = this.Joi.object()
            .keys({
                name: this.Joi.string()
                    .pattern(/^[a-zA-Z ]{3,20}$/)
                    .trim(),
                email: this.Joi.string().trim().email(),
                phone: this.Joi.string().pattern(/^[0-9]{10}$/),
            })
            .required();

        return this.updateValidation(shema)(data);
    }
}

module.exports = new ContactsValidator();
