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
     * @param {}
     * @summary get list of all contacts
     * @returns Promise<ContactModel[]>
     */
    findAll() {
        return this.model.find({}).exec();
    }

    /**
     * @exports
     * @method findById
     * @param {string} _id
     * @summary get a contact
     * @returns {Promise<ContactModel>}
     */
    async findById(_id) {
        const contact = await this.model.findById(_id).exec();
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
            return await this.model.create(contact);
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
     * @summary update a contact's document
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
                throw new NotFoundError(`Not found Contact with id - ${id}`);
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
    async deleteById(_id) {
        try {
            const dbRes = await this.model.findByIdAndDelete({ _id }).exec();
            console.log(dbRes);
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
