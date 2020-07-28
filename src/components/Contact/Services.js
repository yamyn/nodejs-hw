const ContactModel = require('./model');
const ValidError = require('../../error/ValidationError');
const NotFoundError = require('../../error/NotFoundError');
const DuplicateKeyError = require('../../error/DuplicateKeyError');

class ContactsService {
    constructor() {
        this.model = ContactModel;
    }

    /**
     * @exports
     * @method findAll
     * @param {string} id
     * @summary get list of all contacts
     * @returns Promise<ContactModel[]>
     */
    findAll(id) {
        return this.model.find({ user: id }).exec();
    }

    /**
     * @exports
     * @method findById
     * @param {string} _id
     * @param {string}  userId
     * @summary get a contact
     * @returns {Promise<ContactModel>}
     */
    async findById(_id, userId) {
        const contact = await this.model.findOne({ _id, user: userId }).exec();
        if (!contact) {
            throw new NotFoundError(`Not found Contact with id - ${_id}`);
        }

        return contact;
    }

    /**
     * @exports
     * @method create
     * @param {object} contact
     * @summary create a new contact
     * @returns {Promise<ContactModel>}
     */
    async create(contact) {
        try {
            const contacts = await this.findAll(contact.user);
            const isDuplicate = await contacts.some(
                ({ email }) => contact.email === email,
            );
            if (isDuplicate) {
                throw new DuplicateKeyError(
                    `Contact with email ${contact.email}, already exist`,
                );
            }

            return await this.model.create(contact);
        } catch (error) {
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
     * @summary update a contact's document
     * @returns {Promise<void>}
     */
    async updateById({ id: _id, user, ...newData }) {
        try {
            const dbRes = await this.model
                .findOneAndUpdate({ _id, user }, newData, {
                    new: true,
                    useFindAndModify: false,
                })
                .exec();

            if (!dbRes) {
                throw new NotFoundError(`Not found Contact with id - ${_id}`);
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
     * @summary delete a contact from database
     * @returns {Promise<void>}
     */
    async deleteById(_id, userId) {
        try {
            const dbRes = await this.model
                .findOneAndDelete({ _id, user: userId })
                .exec();

            if (!dbRes) {
                throw new NotFoundError(`Not found Contact with id - ${_id}`);
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

module.exports = new ContactsService();
