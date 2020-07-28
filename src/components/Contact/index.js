const ContactServices = require('./Services');
const Validator = require('./Validation');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
    try {
        const { user } = req;
        const contacts = await ContactServices.findAll(user.id);

        return res.status(200).json({
            user,
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
        const { user, params } = req;
        const id = await Validator.deleteOrFindValidation(params);

        const contact = await ContactServices.findById(id, user.id);

        return res.status(200).json({
            user,
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
        const { body, user } = req;
        const data = await Validator.createContactValidation(body);
        data.user = user.id;

        const newContact = await ContactServices.create(data);

        return res.status(201).json({
            user,
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
        const { user, body } = req;
        const data = await Validator.updateContactValidation(body);

        data.user = user.id;

        await ContactServices.updateById(data);

        return res.status(200).json({
            user,
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
        const { user, body } = req;

        const id = await Validator.deleteOrFindValidation(body);

        await ContactServices.deleteById(id, user.id);

        return res.status(200).json({
            user,
            message: `Success delete contact with id - '${body.id}'`,
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
