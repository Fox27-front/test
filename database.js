import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getNotes() {
    const [rows] = await pool.query("SELECT * FROM Users")
    return rows
}

export async function getNote(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM Users
    WHERE id_user = ?
    `, [id])
    return rows[0]
  }

export async function createNote(email, login, pasword) {
    const [result] = await pool.query(`
    INSERT INTO Users (email, login, pasword)
    VALUES (?, ?, ?)
    `, [email, login, pasword])
    const id = result.insertId
    return getNote(id)
  } 

const notes = await getNotes()
console.log(notes)

const note = await getNote(2)
console.log(note)

//const insert = await createNote('test','test','test')
//console.log(insert)