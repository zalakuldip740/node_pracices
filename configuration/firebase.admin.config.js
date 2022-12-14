const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth')
const serviceAccount = require('./firebase.service.json')

// Initialize Firebase
const firebaseApp = admin.initializeApp({
    'credential': admin.credential.cert(serviceAccount),
    'databaseURL': '"https://node-demo-97abc.firebaseio.com"'
});

const firebaseAuth = getAuth(firebaseApp);

const db = admin.firestore(firebaseApp);


module.exports = { firebaseAuth, firebaseApp, db }