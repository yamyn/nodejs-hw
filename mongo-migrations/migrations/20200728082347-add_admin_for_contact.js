const bcrypt = require('bcrypt');
const adminProfile = {
    // change admin data in your creds
    email: 'ricky.month@gmail.com',
    password: 'admin',
    subscription: 'premium',
    token: null,
};

module.exports = {
    async up(db) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(adminProfile.password, salt);

            const createRes = await db.collection('users').insertOne({
                ...adminProfile,
                password: hash,
                createdAt: Date(),
                updatedAt: Date(),
            });
            const { _id: adminId } = createRes.ops[0];
            const contactsId = [];

            await db
                .collection('contacts')
                .find()
                .forEach(contact => {
                    if (contact.user) return;
                    contactsId.push(contact._id);
                    db.collection('contacts').updateOne(
                        { _id: contact._id },
                        { $set: { user: adminId } },
                    );
                });

            await db
                .collection('users')
                .updateOne(
                    { _id: adminId },
                    { $set: { contacts: contactsId } },
                );
        } catch (error) {
            console.log(error);
        }
    },

    async down(db) {
        try {
            const { _id } = await db
                .collection('users')
                .findOne({ email: adminProfile.email });

            await db
                .collection('contacts')
                .find({ user: _id })
                .forEach(contact => {
                    db.collection('contacts').updateOne(
                        { _id: contact._id },
                        { $set: { user: null } },
                    );
                });

            await db.collection('users').findOneAndDelete({ _id });
        } catch (error) {
            console.log(error);
        }
    },
};
