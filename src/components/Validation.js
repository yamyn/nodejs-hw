const Joi = require('@hapi/joi');
const { isValid: validId } = require('mongoose').Types.ObjectId;
const ValidError = require('../error/ValidationError');

class Validator {
    constructor() {
        this.Joi = Joi;
        this.validId = validId;
    }

    invalidIdMessage = id => `id - ${id} is invalid!`;

    createValidation(shema) {
        return (data) => {
            return new Promise((resolve, reject) => {
                const { error, value } = shema.validate(data);
                if (error) {
                    reject(new ValidError(error.details));
                }
                resolve(value);
            })
        };
    }

    updateValidation(shema) {
        return ({ id, ...data }) => {
            new Promise((resolve, reject) => {
                this.isValidId(id)(reject);

                const { error, value } = shema.validate(data);
                if (error) {
                    reject(new ValidError(error.details));
                }

                resolve({ id, ...value });
            })
        };
    }

    deleteOrFindValidation = ({ id }) =>
        new Promise((resolve, reject) => {
            this.isValidId(id)(reject);
            resolve(id);
        });

    isValidId(id) {
        const isId = this.validId(id);

        return reject => {
            if (isId) return id;
            return reject(new ValidError(this.invalidIdMessage(isId)));
        };
    }
}

module.exports = Validator;
