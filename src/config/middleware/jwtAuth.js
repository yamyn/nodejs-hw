const jwt = require('jsonwebtoken');
const { SECRET: secret } = process.env;
const UserService = require('../../components/User/Services');
const UnauthorizedError = require('../../error/UnauthorizedError');

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 */
async function isAuthenticated(req, res, next) {
    const BearerToken = req.headers['authorization'];

    if (BearerToken) {
        try {
            const [, token] = BearerToken.split(' ');
            const { id } = jwt.verify(token, secret);
            const {
                email,
                subscription,
                token: refreshToken,
            } = await UserService.findById(id);
            if (!refreshToken) throw new UnauthorizedError('Not authorized');

            req.user = { id, email, subscription };

            return next();
        } catch (error) {
            const jwtError = new UnauthorizedError(error.message);
            res.status(jwtError.code).json({
                message: jwtError.name,
                details: jwtError.message,
            });
        }
    }
    const error = new UnauthorizedError('Not authorized');
    res.status(error.code).json({
        message: error.name,
        details: error.message,
    });
}

module.exports = {
    isAuthenticated,
};
