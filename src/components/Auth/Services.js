const UsersModel = require('../User/model');
const UserService = require('../User/Services');
const ValidError = require('../../error/ValidationError');
const NotFoundError = require('../../error/NotFoundError');
const jwt = require('jsonwebtoken');

class AuthService {
    constructor() {
        this.model = UsersModel;
    }

    /**
     * @exports
     * @method create
     * @param {object} user
     * @summary create a new user
     * @returns {Promise<String>}
     */
    async createUser(data) {
        try {
            const user = await UserService.create(data);
            const accessToken = jwt.sign({ id: user._id }, secret, {
                expiresIn: '60m'
            });
            const refreshToken = jwt.sign({ id: user._id }, secret, {
                expiresIn: '90d'
            });
            await this.updateRefresh(user._id, refreshToken);

            return { ...user, accessToken, refreshToken }
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find a user by id and update refreshToken
     * @exports
     * @method updateById
     * @param {string} _id
     * @param {object} newData
     * @summary update a user's document
     * @returns {Promise<void>}
     */
    async updateRefresh(_id, token) {
        try {
            const dbRes = await this.model
                .findByIdAndUpdate({ _id }, token, {
                    new: true,
                    useFindAndModify: false,
                })
                .exec();

            if (!dbRes) {
                throw new NotFoundError(`Not found User with id - ${id}`);
            }
        } catch (error) {
            if (error.name === 'MongoError') {
                throw new ValidError(error.message);
            }

            throw error;
        }
    }

    /**
     * @exports
     * @method deleteById
     * @param {string} _id
     * @summary delete a user from database
     * @returns {Promise<void>}
     */
    async deleteById(_id) {
        try {
            const dbRes = await this.model.findByIdAndDelete({ _id }).exec();

            if (!dbRes) {
                throw new NotFoundError(`Not found User with id - ${_id}`);
            }

            return;
        } catch (error) {
            if (error.name === 'MongoError') {
                throw new ValidError(error.message);
            }

            throw error;
        }
    }
}

module.exports = new AuthService();
