// TODO: tampilkan teks pada notes.txt pada console.
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'notes.txt');
const data = fs.readFileSync(filePath, 'utf-8');
console.log(data);
