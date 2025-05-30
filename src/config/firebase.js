// Firebase admin

const admin = require('firebase-admin');
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;

