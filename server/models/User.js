const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    create: (userData, callback) => {
        bcrypt.hash(userData.password, 10, (err, hash) => {
            if (err) throw err;
            userData.password = hash;
            const query = 'INSERT INTO clients SET ?';
            db.query(query, userData, callback);
        });
    },
    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM clients WHERE email = ?';
        db.query(query, [username], callback);
    },
    comparePassword: (password, hash, callback) => {
        bcrypt.compare(password, hash, (err, isMatch) => {
            if (err) throw err;
            callback(null, isMatch);
        });
    },
};

module.exports = User;
