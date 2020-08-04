const bcrypt = require('bcrypt');
const { Schema } = require('mongoose');
const { subscriptionEnum, genderEnum } = require('./enums');
const connections = require('../../config/conection');

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatarURL: String,
        gender: {
            type: String,
            enum: Object.values(genderEnum),
            required: true,
        },
        subscription: {
            type: String,
            enum: Object.values(subscriptionEnum),
            default: subscriptionEnum.free,
        },
        token: String,
        verificationToken: String,
        contacts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'contacts',
            },
        ],
    },
    {
        timestamps: true,
        autoIndex: true,
    },
    {
        collection: 'users',
        versionKey: false,
    },
).pre('save', async function (next) {
    try {
        const user = this;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const match = await bcrypt.compare(candidatePassword, this.password);

        return match;
    } catch (error) {
        return error;
    }
};

module.exports = connections.model('users', UserSchema);
