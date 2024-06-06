const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/server.db");

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
)`);


module.exports.userRepository = {

    async createUser(obj) {
        let id;
        if (obj.hasOwnProperty("name") && obj.hasOwnProperty("age")) {
            id = await new Promise((resolve, reject) => {
                db.run(`INSERT INTO users (name, age) VALUES (?, ?)`, [obj.name, obj.age], function (err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                });
            })
            .catch(() => null)
            if (id) return this.getUser(id);
        }
        return id;
    },

    async getAllUsers() {
        const users = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM users`, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        })
        .catch(() => null);
        return users;
    },
    
    async getUser(id) {
        const user = await new Promise((resolve, reject) => {
            db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        })
        .catch(() => null);
        return user;
    },

    async updateUser(id, obj) {
        let changes;
        if (obj.hasOwnProperty("name") && obj.hasOwnProperty("age")) {
            let changes = await new Promise((resolve, reject) => {
                db.run(`UPDATE users SET name = ?, age = ? WHERE id = ?`, [obj.name, obj.age, id], function (err) {
                    if (err) reject(err);
                    else resolve(this.changes);
                });
            })
            .catch(() => null)
            if (changes) return this.getUser(id);
            if (changes === 0) changes = undefined;
        }
        return changes;
    },

    async deleteUser(id) {
        const changes = await new Promise((resolve, reject) => {
            db.run(`DELETE FROM users WHERE id = ?`, [id], function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        })
        .catch(() => null);
        return changes === 0 ? undefined : changes;
    }
}