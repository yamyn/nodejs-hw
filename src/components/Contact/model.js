const Conection = require('../../config/conection');

class ContactsModel {
    constructor() {
        this.db = Conection;
    }

    findAll() {
        return this.db.getData();
    }

    async findById(id) {
        const contacts = await this.db.getData();

        return contacts.find(contact => contact.id === id);
    }

    async create(data) {
        const oldContacts = await this.db.getData();
        const isDublicate = oldContacts.some(
            ({ email }) => email === data.email,
        );

        if (isDublicate) {
            throw new Error(`Contact with email - ${data.email} already exist`);
        }

        const id = this.db.genId();
        const newContactsList = [{ id, ...data }, ...oldContacts];

        const isCreate = await this.db.writeData(newContactsList);

        if (isCreate) return id;

        throw new Error('Database error, don`t create new contact');
    }

    async updateById(id, data) {
        const oldContacts = await this.db.getData();
        const haveContact = oldContacts.some(contact => contact.id === id);
        if (!haveContact) throw new Error(`Not found Contact with id - ${id}`);

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
        const filterdContacts = contacts.filter(contact => contact.id !== id);

        const isRemove = await this.db.writeData(filterdContacts);

        if (isRemove) return;

        throw new Error('Database error, don`t remove contact');
    }
}

module.exports = new ContactsModel();
