if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { SENDGRID_API_KEY, SENDGRID_SENDER, API_URL, PORT } = process.env;
const { v4: uuidv4 } = require('uuid');
const collection = 'users';
const fs = require('fs');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

const msgMaker = require('../data/getVerificationMessage');
const verificationTokensPath = `${__dirname}/../data/verifyTokensByDown.json`;

module.exports = {
  async up(db) {
    try {
      const verificationTokens = [];
      await db
        .collection(collection)
        .find()
        .forEach(user => {

          if (user.verificationToken) return;
          const verificationToken = uuidv4();
          db.collection(collection).updateOne(
            { _id: user._id },
            { $set: { verificationToken } },
          );
          verificationTokens.push({ verificationToken, email: user.email });

        });
      await Promise.all(verificationTokens.map(data => {
        const link = `${API_URL}:${PORT}/api/auth/verify/${data.verificationToken}`
        const msg = msgMaker(data.email, SENDGRID_SENDER, link);
        return sgMail.send(msg);
      }));

      fs.writeFileSync(verificationTokensPath, JSON.stringify(verificationTokens.map(data => data.verificationToken)));
    } catch (error) {
      console.log(error);
    }
  },

  async down(db) {
    const verificationTokens = JSON.parse(fs.readFileSync(verificationTokensPath));

    await db
      .collection(collection)
      .find({ verificationToken: { $in: verificationTokens } })
      .forEach(user => {
        db.collection(collection).updateOne(
          { _id: user._id },
          { $set: { verificationToken: null } },
        );
      });

    fs.unlinkSync(verificationTokensPath)
  }
};
