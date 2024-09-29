const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

class Address {
    static createAddress(userId, street, city, state, zip, callback) {
        const sql = 'INSERT INTO address (user_id, street, city, state, zip) VALUES (?, ?, ?, ?, ?)';
        db.run(sql, [userId, street, city, state, zip], function (err) {
            callback(err, this.lastID);
        });
    }

    static getAddressByUserId(userId, callback) {
        const sql = 'SELECT * FROM address WHERE user_id = ?';
        db.get(sql, [userId], (err, row) => {
            callback(err, row);
        });
    }

    static getAllAddresses(callback) {
        const sql = 'SELECT * FROM address';
        db.all(sql, [], (err, rows) => {
            callback(err, rows);
        });
    }

    static deleteAddressByUserId(userId, callback) {
        const sql = 'DELETE FROM address WHERE user_id = ?';
        db.run(sql, [userId], function (err) {
            callback(err);
        });
    }

}

module.exports = Address;
