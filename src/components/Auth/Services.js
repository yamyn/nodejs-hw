const UsersModel = require('../User/model');
const UserService = require('../User/Services');
const ValidError = require('../../error/ValidationError');
const NotFoundError = require('../../error/NotFoundError');
const UnauthorizedError = require('../../error/UnauthorizedError');
const jwt = require('jsonwebtoken');
const { SECRET: secret } = process.env;

class AuthService {
    constructor() {
        this.model = UsersModel;
    }

    /**
     * @method create
     * @param {object} user
     * @summary create a new user
     * @returns {Promise<UsersModel>}
     */
    async createUser(data) {
        try {
            const { _id: id, email, subscription } = await UserService.create(
                data,
            );
            const { accessToken, refreshToken } = this.parseTokens(id);
            await this.updateRefresh(id, refreshToken);

            return {
                user: {
                    id,
                    email,
                    subscription,
                },
                accessToken,
                refreshToken,
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find a user by id and update refreshToken
     * @method updateById
     * @param {string} _id
     * @param {object} newData
     * @summary update a user's document
     * @returns {Promise<void>}
     */
    async updateRefresh(_id, token) {
        try {
            const dbRes = await this.model
                .findByIdAndUpdate(
                    { _id },
                    { token },
                    {
                        new: true,
                        useFindAndModify: false,
                    },
                )
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

    async getTokensByRefresh(oldToken) {
        try {
            const { id } = jwt.verify(oldToken, secret);
            const user = await UserService.findById(id);
            console.log(user);
            if (user && user.token === oldToken) {
                const { accessToken, refreshToken } = this.parseTokens(id);
                await this.updateRefresh(id, refreshToken);
                const { email, subscription } = user;

                return {
                    user: {
                        id,
                        email,
                        subscription,
                    },
                    accessToken,
                    refreshToken,
                };
            }

            throw new UnauthorizedError('Not authorized');
        } catch (error) {
            throw error;
        }
    }

    /**
     * @method getUser
     * @param {data} user
     * @summary find user by email and compare password
     * @returns {Promise<void>}
     */
    async getUser({ email, password }) {
        try {
            const user = await this.model.findOne({ email });
            const isMatched = user && (await user.comparePassword(password));
            if (!isMatched) {
                throw new ValidError(`Invalid login or password`);
            }
            const { _id: id, subscription } = user;
            const { accessToken, refreshToken } = this.parseTokens(id);

            await this.updateRefresh(id, refreshToken);

            return {
                user: {
                    id,
                    email,
                    subscription,
                },
                accessToken,
                refreshToken,
            };
        } catch (error) {
            if (error.name === 'MongoError') {
                throw new ValidError(error.message);
            }

            throw error;
        }
    }

    /**
     * @method parseTokens
     * @param {id} string
     * @summary delete a user from database
     * @returns {Promise<void>}
     */
    parseTokens(id) {
        const accessToken = jwt.sign({ id }, secret, {
            expiresIn: '60m',
        });
        const refreshToken = jwt.sign({ id }, secret, {
            expiresIn: '90d',
        });

        return {
            accessToken,
            refreshToken,
        };
    }
}

module.exports = new AuthService();
