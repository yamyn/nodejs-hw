const getContacts = require('../oldDb/getContacts');
const collection = 'contacts';

module.exports = {
    async up(db) {
        try {
            const contacts = getContacts();
            for (let i = 0; i < contacts.length; i += 1) {
                await db.collection(collection).insertOne({
                    ...contacts[i],
                    createdAt: Date(),
                    updatedAt: Date(),
                });
            }
        } catch (error) {
            console.log(error);
        }
    },

    async down(db) {
        try {
            await db.collection(collection).drop();
        } catch (error) {
            console.log(error);
        }
    },
};
