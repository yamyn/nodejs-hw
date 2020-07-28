const { Schema } = require('mongoose');
const connections = require('../../config/conection');

const ContactsSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'user' },
    },
    {
        timestamps: true,
        autoIndex: true,
    },
    {
        collection: 'contacts',
        versionKey: false,
    },
);

module.exports = connections.model('contacts', ContactsSchema);
