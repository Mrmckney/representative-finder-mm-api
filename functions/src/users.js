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
        .then(docRef => res.send({id: docRef.id}))
        .catch(err => res.status(500).send('User could not be created'))
}

exports.getUser = (req, res) => {
    const db = connectDb()

    db.collection('users')
        .where('email', '==', req.params.email)
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                const user = doc.data()
                user.id = doc.id
                res.status(200).json({
                    status: 'success',
                    data: user,
                    message: 'User loaded successfully',
                    statusCode: 200,
                })
            })
        })
        .catch(err => res.status(500).send('User could not be found'))
}

exports.updateUser = (req, res) => {
    const db = connectDb()
    db.collection('users')
        .doc(req.params.userId)
        .update(req.body)
        .then(docRef => res.send({id: docRef.id}))
        .catch(err => res.status(500).send('User could not be updated'))
}
