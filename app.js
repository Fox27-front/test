import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import {getNotes, getNote} from '../WebShop2024/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
const PORT = 3000

app.use(express.static(__dirname + '/public'))
app.listen(PORT, ()=>{
    console.log(`Server listening on: http://localhost:${PORT}`) 
})

process.on('uncaughtException', function (err) {
  console.log(err);
}); 

const notes = await getNotes()
console.log(notes)

const note = await getNote(2)
console.log(note)