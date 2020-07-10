const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// TODO: viev all contacts
function listContacts() {
    fs.readFile(contactsPath, (err, data) => {
        if (err) throw err;
        console.log(JSON.parse(data));
    });
}

// TODO: viev contact with received id, to get id
function getContactById(contactId) {
    fs.readFile(contactsPath, (err, data) => {
        if (err) throw err;
        const contacts = JSON.parse(data);
        const currentContact = contacts.find(
            contact => contact.id === contactId,
        );
        if (!currentContact) return console.log('Contact not found!');
        console.log(currentContact);
    });
}

// TODO: remove contact with received id, to get id
function removeContact(contactId) {
    fs.readFile(contactsPath, (err, data) => {
        if (err) throw err;
        const contacts = JSON.parse(data);
        const filtredContacts = contacts.filter(
            contact => contact.id !== contactId,
        );
        fs.writeFile(contactsPath, JSON.stringify(filtredContacts), err => {
            if (err) throw err;
            console.log(`contact with id-${contactId} was removed`);
        });
    });
}

// TODO: create new contact and add to database with generated id, to get name, email and phone
function addContact(name, email, phone) {
    const newContact = {
        name,
        email,
        phone,
        id: shortid.generate(),
    };
    fs.readFile(contactsPath, (err, data) => {
        if (err) throw err;
        const contacts = JSON.parse(data);
        contacts.push(newContact);
        fs.writeFile(contactsPath, JSON.stringify(contacts), err => {
            if (err) throw err;
            console.log(`Added new contact with id-${newContact.id}`);
        });
    });
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
