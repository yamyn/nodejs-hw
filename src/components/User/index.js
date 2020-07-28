const UserServices = require('./Services');
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
        const users = await UserServices.findAll();

        return res.status(200).json({
            message: 'Success get all users',
            data: users,
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
        const id = await Validator.deleteOrFindValidation(req.params);

        const user = await UserServices.findById(id);

        return res.status(200).json({
            message: 'Success find user',
            data: user,
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
        const data = await Validator.createUserValidation(req.body);

        const { password, ...newUser } = await UserServices.create(data);

        return res.status(201).json({
            message: 'Success create user',
            data: newUser,
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
        const data = await Validator.updateUserValidation(req.body);

        await UserServices.updateById(data);

        return res.status(200).json({
            message: 'Success update user',
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
        const id = await Validator.deleteOrFindValidation(req.body);

        await UserServices.deleteById(id);

        return res.status(200).json({
            message: `Success delete user with id - '${req.body.id}'`,
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
