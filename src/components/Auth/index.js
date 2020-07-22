const AuthService = require('./Services');


const Validator = require('../User/Validation');
const secret = process.env.JWT_SECRET;


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
            status: 200,
            logged: true,
            data: user,
            message: 'Sign in successfull'
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
export async function login(req, res, next) {
    try {
        const user = await AuthService.getUser(req.body);

        const token = jwt.sign({ id: user._id }, secret, {
            expiresIn: '360m'
        });

        res.json({
            status: 200,
            logged: true,
            token: token,
            message: 'Sign in successfull'
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
