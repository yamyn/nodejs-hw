const ContactsModel = require('./model');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
    try {
        const contacts = await ContactsModel.findAll();

        return res.status(200).json({
            data: contacts,
        });
        // res.status(200).render('index', {
        //     csrfToken: req.csrfToken(),
        //     template: 'users/table.ejs',
        //     users,
        //     errors: req.flash('error'),
        //     successes: req.flash('sucsess'),
        // });
    } catch (error) {
        // res.status(500).render('errors/validError.ejs', {
        //     method: 'get',
        //     name: error.name,
        //     message: null,
        // });

        next(error);
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
        const { id } = req.params;

        const contact = await ContactsModel.findById(id);

        if (!contact) throw new Error(`Contact with id '${id}' not found!`);

        return res.status(200).json({
            data: contact,
        });
    } catch (error) {
        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
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
        const id = await ContactsModel.create(req.body);

        return res.status(200).json({
            data: `Contact create with id - '${id}'`,
        });
    } catch (error) {
        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        next(error);
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
        await ContactsModel.updateById(req.body.id, req.body);

        return res.status(200).json({
            data: `Success update contact with id - '${req.body.id}'`,
        });
    } catch (error) {
        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        next(error);
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
        await ContactsModel.deleteById(req.body.id);

        return res.status(200).json({
            data: `Success delete contact with id - '${req.body.id}'`,
        });
    } catch (error) {
        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        next(error);
    }
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
