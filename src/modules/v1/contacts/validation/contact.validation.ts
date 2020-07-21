import * as joi from '@hapi/joi';
import { Types } from 'mongoose';

export const validateCreateContactSchema = joi
    .object({
        name: joi
            .string()
            .trim()
            .required()
            .min(3),
        planId: joi
            .string()
            .trim()
            .required()
            .min(3)
    })
    .required();

export const validateUpdateContactSchema = joi
    .object({
        id: joi
            .number()
            .positive()
            .required(),
        name: joi
            .string()
            .trim()
            .min(3),
        planId: joi
            .string()
            .trim()
            .min(3),
        invoiceName: joi
            .string()
            .trim()
            .min(3),
        description: joi
            .string()
            .trim()
            .min(3),
        showDescInvoices: joi.boolean(),
    })
    .required();

export const validateFindOneDeleteContactSchema = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) reject new Error
    });
}
