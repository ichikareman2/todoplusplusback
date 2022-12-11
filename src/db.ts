import fs from 'fs';
import sqlite3 from 'sqlite3'


var dir = './var/db';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}
const db = new sqlite3.Database('./var/db/todos.db')

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS todos (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    done INTEGER
  )`)
})

export default db;