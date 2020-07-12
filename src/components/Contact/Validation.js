const Joi = require('@hapi/joi');
const { isValid: validId } = require('shortid');
const ValidError = require('../../error/ValidationError');

class ContactsValidator {
    constructor() {
        this.Joi = Joi;
        this.validId = validId;
    }

    invalidIdMessage = (id) => `id - ${id} is invalid!`;

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

        return new Promise((resolve, reject) => {
            const { error, value } = shema.validate(data);
            if (error) {
                reject(new ValidError(error.details));
            }
            resolve(value);
        });
    }

    updateContactValidation({ id, ...data }) {
        const shema = this.Joi.object()
            .keys({
                name: this.Joi.string()
                    .pattern(/^[a-zA-Z ]{3,20}$/)
                    .trim(),
                email: this.Joi.string().trim().email(),
                phone: this.Joi.string().pattern(/^[0-9]{10}$/),
            })
            .required();

        return new Promise((resolve, reject) => {
            this.isValidId(id)(reject);

            const { error, value } = shema.validate(data);
            if (error) {
                reject(new ValidError(error.details));
            }

            resolve(value);
        });
    }

    deleteOrFindContactValidation = ({ id }) =>
        new Promise((resolve, reject) => {
            this.isValidId(id)(reject);
            resolve(id);
        });


    isValidId(id) {
        const isId = this.validId(id);

        return (reject) => {
            if (isId) return id;
            return reject(new ValidError(this.invalidIdMessage(isId)))
        }
    }
}

module.exports = new ContactsValidator();
