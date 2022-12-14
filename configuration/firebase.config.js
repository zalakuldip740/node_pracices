const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth')

const firebaseConfig = {
    apiKey: "AIzaSyDiEOwv3JYYBol3fLq1U0-xfmLeMES6diw",
    authDomain: "node-demo-97abc.firebaseapp.com",
    projectId: "node-demo-97abc",
    storageBucket: "node-demo-97abc.appspot.com",
    messagingSenderId: "972229663312",
    appId: "1:972229663312:web:5aa8e648d1afc0e2340f55"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp);


module.exports = { firebaseAuth, firebaseApp }