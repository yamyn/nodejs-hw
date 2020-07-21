const contacts = require('./contacts.json');

module.exports = () => contacts.map(({ id, ...contact }) => contact);
