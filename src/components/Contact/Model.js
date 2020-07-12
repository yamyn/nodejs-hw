const Conection = require('../../config/Conection');
const ValidError = require('../../error/ValidationError');
const NotFoundError = require('../../error/NotFoundError');

class ContactsModel {
    constructor() {
        this.db = Conection;
    }

    findAll() {
        return this.db.getData();
    }

    async findById(id) {
        const contacts = await this.db.getData();
        const contact = contacts.find(contact => contact.id === id);

        if (!contact) {
            throw new NotFoundError(`Not found Contact with id - ${id}`);
        }

        return contact;
    }

    async create(data) {
        const oldContacts = await this.db.getData();
        const isDublicate = oldContacts.some(
            ({ email }) => email === data.email,
        );

        if (isDublicate) {
            throw new ValidError(
                `Contact with email - ${data.email} already exist`,
            );
        }

        const newContact = { id: this.db.genId(), ...data };
        const newContactsList = [newContact, ...oldContacts];

        const isCreate = await this.db.writeData(newContactsList);

        if (isCreate) return newContact;

        throw new Error('Database error, don`t create new contact');
    }

    async updateById({ id, ...data }) {
        const oldContacts = await this.db.getData();
        const haveContact = oldContacts.some(contact => contact.id === id);
        if (!haveContact) {
            throw new NotFoundError(`Not found Contact with id - ${id}`);
        }

        const updatedContacts = oldContacts.map(contact => {
            if (contact.id !== id) return contact;
            return { ...contact, ...data };
        });

        const isUpdate = await this.db.writeData(updatedContacts);

        if (isUpdate) return;

        throw new Error('Database error, don`t update contact');
    }

    async deleteById(id) {
        const contacts = await this.db.getData();
        const haveContact = contacts.some(contact => contact.id === id);
        if (!haveContact) {
            throw new NotFoundError(`Not found Contact with id - ${id}`);
        }

        const filterdContacts = contacts.filter(contact => contact.id !== id);

        const isRemove = await this.db.writeData(filterdContacts);

        if (isRemove) return;

        throw new Error('Database error, don`t remove contact');
    }
}

module.exports = new ContactsModel();
