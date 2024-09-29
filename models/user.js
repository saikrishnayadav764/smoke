const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

class User {
    static createUser(name, email, callback) {
        const sql = 'INSERT INTO user (name, email) VALUES (?, ?)';
        db.run(sql, [name, email], function (err) {
            callback(err, this.lastID);
        });
    }

    static getUserById(id, callback) {
        const sql = 'SELECT * FROM user WHERE id = ?';
        db.get(sql, [id], (err, row) => {
            callback(err, row);
        });
    }

    static getAllUsers(callback) {
        const sql = 'SELECT * FROM user';
        db.all(sql, [], (err, rows) => {
            callback(err, rows);
        });
    }

    static deleteUserById(id, callback) {
        const sql = 'DELETE FROM user WHERE id = ?';
        db.run(sql, [id], function (err) {
            callback(err);
        });
    }
}

module.exports = User;
