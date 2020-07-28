const AuthService = require('./Services');
const Validator = require('../User/Validation');

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
async function signup(req, res, next) {
    try {
        const data = await Validator.createUserValidation(req.body);

        const user = await AuthService.createUser(data);

        res.json({
            status: 201,
            logged: true,
            data: user,
            message: 'Sign in successfull',
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
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
async function login(req, res, next) {
    try {
        const data = await Validator.createUserValidation(req.body);
        const user = await AuthService.getUser(data);

        res.json({
            status: 200,
            logged: true,
            data: user,
            message: 'Login in successfull',
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

async function getTokens(req, res, next) {
    try {
        const { refreshToken } = req.body;
        const user = await AuthService.getTokensByRefresh(refreshToken);

        res.json({
            status: 200,
            logged: true,
            data: user,
            message: 'New tokens sign successfull',
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

async function logout(req, res, next) {
    try {
        const { id } = req.user;
        await AuthService.updateRefresh(id, null);

        res.status(204).json({
            status: 204,
            logged: false,
            message: 'Logout successfull',
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
    logout,
    getTokens,
    signup,
    login,
};
