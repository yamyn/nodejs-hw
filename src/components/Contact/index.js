const ContactServices = require('./services');
const Validator = require('./Validation');
const ValidError = require('../../error/ValidationError');
const NotFoundError = require('../../error/NotFoundError');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
    try {
        const contacts = await ContactServices.findAll();

        return res.status(200).json({
            message: 'Success get all contacts',
            data: contacts,
        });
    } catch (error) {
        const status = error.code || 500;

        res.status(status).json({
            message: error.name,
            details: error.message,
        });

        if (status === 500) next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findById(req, res, next) {
    try {
        const id = await Validator.deleteOrFindContactValidation(req.params);

        const contact = await ContactServices.findById(id);

        return res.status(200).json({
            message: 'Success find contact',
            data: contact,
        });
    } catch (error) {
        const status = error.code || 500;

        res.status(status).json({
            message: error.name,
            details: error.message,
        });

        if (status === 500) next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req, res, next) {
    try {
        const data = await Validator.createContactValidation(req.body);

        const newContact = await ContactServices.create(data);
        console.log(newContact);
        return res.status(201).json({
            message: 'Success create contact',
            data: newContact,
        });
    } catch (error) {
        const status = error.code || 500;

        res.status(status).json({
            message: error.name,
            details: error.message,
        });

        if (status === 500) next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateById(req, res, next) {
    try {
        const data = await Validator.updateContactValidation(req.body);

        await ContactServices.updateById(data);

        return res.status(200).json({
            message: 'Success update contact',
            data: data,
        });
    } catch (error) {
        const status = error.code || 500;

        res.status(status).json({
            message: error.name,
            details: error.message,
        });

        if (status === 500) next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req, res, next) {
    try {
        const id = await Validator.deleteOrFindContactValidation(req.body);

        await ContactServices.deleteById(id);

        return res.status(200).json({
            message: `Success delete contact with id - '${req.body.id}'`,
        });
    } catch (error) {
        const status = error.code || 500;

        res.status(status).json({
            message: error.name,
            details: error.message,
        });

        if (status === 500) next(error);
    }
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
