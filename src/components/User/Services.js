const UsersModel = require('./model');
const ValidError = require('../../error/ValidationError');
const NotFoundError = require('../../error/NotFoundError');
const DuplicateKeyError = require('../../error/DuplicateKeyError');
const AvatarUploader = require('./utils/AvatarUploader.util');

class UsersService {
    constructor() {
        this.model = UsersModel;
    }

    /**
     * @exports
     * @method findAll
     * @param {}
     * @summary get list of all users
     * @returns Promise<UsersModel[]>
     */
    findAll() {
        return this.model.find({}).exec();
    }

    /**
     * @exports
     * @method findById
     * @param {string} _id
     * @summary get a user
     * @returns {Promise<UsersModel>}
     */
    async findById(_id) {
        const user = await this.model.findById(_id).exec();
        if (!user) {
            throw new NotFoundError(`Not found User with id - ${_id}`);
        }

        return user;
    }

    /**
     * @exports
     * @method create
     * @param {object} user
     * @summary create a new user
     * @returns {Promise<UsersModel>}
     */
    async create(user) {
        try {
            const avatar = await AvatarUploader.getSimpleAvatar(
                user.email,
                user.gender,
            );
            const avatarURL = await AvatarUploader.uploadFile(
                avatar,
                user.email,
                'png',
            );

            return await this.model.create({ ...user, avatarURL });
        } catch (error) {
            if (error.code === 11000) {
                throw new DuplicateKeyError(error.message);
            }
            if (error.name === 'MongoError') {
                throw new ValidError(error.message);
            }

            throw error;
        }
    }

    /**
     * Find a user by id and update his profile
     * @exports
     * @method updateById
     * @param {string} _id
     * @param {object} newData
     * @summary update a user's document
     * @returns {Promise<void>}
     */
    async updateById({ id, ...newData }) {
        try {
            const dbRes = await this.model
                .findByIdAndUpdate({ _id: id }, newData, {
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

    /**
     * @exports
     * @method  uploadAvatar
     * @param {object} file
     * @summary upload avatar to cloud and get link
     * @returns {Promise<void>}
     */
    async uploadAvatar(user, { originalname, path }) {
        try {
            const avatarURL = await AvatarUploader.uploadAvatar(
                user.email,
                originalname,
                path,
            );
            console.log(avatarURL);
            await this.model.findByIdAndUpdate({ _id: user.id }, { avatarURL });

            return avatarURL;
        } catch (error) {
            if (error.name === 'MongoError') {
                throw new ValidError(error.message);
            }

            throw error;
        }
    }
}

module.exports = new UsersService();
