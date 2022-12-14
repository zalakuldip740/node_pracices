const { firebaseAuth } = require("../configuration/firebase.config")
const auth = require('firebase/auth')
function loginWithEmailPassword(req, res) {
    auth.signInWithEmailAndPassword(firebaseAuth, req.body.email, req.body.password).then((userCred) => {
        const user = userCred.user;
        user.getIdToken().then((accessToken) => {
            res.status(200).json({
                'accessToken': accessToken,
                'email': user.email,
                'name': user.displayName,
                'isEmailVerified': user.isEmailVerified,
                'firebaseAuthId': user.uid,
                "phoneNumber": user.phoneNumber,
                "photoURL": user.photoURL
            });
        }).catch((error) => {
            res.status(400).json({
                'errorCode': error.code,
                'message': error.message
            });
        })
    }).catch((error) => {
        res.json({
            'errorCode': error.code,
            'message': error.message
        });
    })
}

function signUpWithEmailPassword(req, res) {
    auth.createUserWithEmailAndPassword(firebaseAuth, req.body.email, req.body.password).then((userCred) => {
        const user = userCred.user;
        user.getIdToken().then((accessToken) => {
            res.status(200).json({
                'accessToken': accessToken,
                'email': user.email,
                'name': user.displayName,
                'isEmailVerified': user.isEmailVerified,
                'firebaseAuthId': user.uid,
                "phoneNumber": user.phoneNumber,
                "photoURL": user.photoURL
            });
        }).catch((error) => {
            res.status(400).json({
                'errorCode': error.code,
                'message': error.message
            });
        })
    }).catch((error) => {
        res.json({
            'errorCode': error.code,
            'message': error.message
        });
    })
}

module.exports = { loginWithEmailPassword, signUpWithEmailPassword }