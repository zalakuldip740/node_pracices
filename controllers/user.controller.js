const { db } = require('../configuration/firebase.admin.config');

function getUserDetailsById(req, res) {
    const userDoc = db.doc(`users/${res.locals.uid}`)
    userDoc.get().then((data) => {
        if (data.data() != undefined) {
            res.json(data.data());
        } else {
            res.status(404).json({
                'errorCode': 'not found',
                'message': `no record found for user = ${data.id}`
            });
        }

    }).catch((error) => {
        res.status(500).json(
            {
                'errorCode': error.errorCode,
                'message': error.message
            }
        );
    });
}

function addUserDetails(req, res) {
    const userDoc = db.doc(`users/${res.locals.uid}`)
    userDoc.set(req.body).then(() => {
        res.json({ 'message': 'data added successfully' });
    }).catch((error) => {
        res.status(500).json(
            {
                'errorCode': error.errorCode,
                'message': error.message
            }
        );
    });
}

function deleteUserDetails(req, res) {
    const userDoc = db.doc(`users/${res.locals.uid}`)
    userDoc.delete().then(() => {
        res.json({ 'message': 'data deleted successfully' });
    }).catch((error) => {
        res.status(500).json(
            {
                'errorCode': error.errorCode,
                'message': error.message
            }
        );
    });
}

function updateUserDetails(req, res) {
    const userDoc = db.doc(`users/${res.locals.uid}`)
    userDoc.update(req.body).then(() => {
        res.json({ 'message': 'data updated successfully' });
    }).catch((error) => {
        res.status(500).json(
            {
                'errorCode': error.errorCode,
                'message': error.message
            }
        );
    });
}
module.exports = { getUserDetailsById, addUserDetails, deleteUserDetails, updateUserDetails }