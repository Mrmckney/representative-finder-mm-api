const admin = require('firebase-admin')
const credentials = require('../credentials.json')

function connectDb() {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(credentials)
        })
    }
    return admin.firestore()
}

exports.createUser = (req, res) => {
    const db = connectDb() // connect to db

    db.collection('users')
        .add(req.body)
        .then(docRef => res.send(docRef.id))
        .catch(err => res.status(500).send('User could not be created'))
}