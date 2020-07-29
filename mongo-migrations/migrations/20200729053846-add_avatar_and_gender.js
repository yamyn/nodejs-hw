const avatarURL =
    'https://contacts-api-bucket.s3.eu-central-1.amazonaws.com/avatars/standart.png';
const collection = 'users';
module.exports = {
    async up(db) {
        await db
            .collection(collection)
            .find()
            .forEach(user => {
                const conditions = {};
                if (!user.avatarURL) conditionsavatarURL = avatarURL;
                if (!user.gender) conditions.gender = null;
                if (Object.keys(conditions) === 0) return;

                db.collection(collection).updateOne(
                    { _id: user._id },
                    { $set: conditions },
                );
            });
    },

    async down(db) {
        await db
            .collection(collection)
            .find({ avatarURL })
            .forEach(user => {
                db.collection(collection).updateOne(
                    { _id: user._id },
                    { $set: { avatarURL: null } },
                );
            });
    },
};
