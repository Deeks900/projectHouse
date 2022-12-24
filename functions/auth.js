const functions = require('firebase-functions');
const serviceAccount = require('./private/cl-dev-pk.json');

const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:"https://fir-tutorial-e247d-default-rtdb.firebaseio.com"
});

const db = admin.firestore();
const rtdb = admin.database();

module.exports = {
  db,
  rtdb,
  admin,
};
