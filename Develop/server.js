const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Add this line

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// API routes
app.get('/api/notes', (req, res) => {

  const saveNotes = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf8'));
  res.json(saveNotes);
});

app.post('/api/notes', (req, res) => {
  const saveNotes = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf8'));
  const newNote = { ...req.body, id: uuidv4() };
  saveNotes.push(newNote);
  fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(saveNotes));
  res.json({ message: "You've saved a note!" });
});

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  let saveNotes = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf8'));
  saveNotes = saveNotes.filter(note => note.id !== id);
  fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(saveNotes));
  res.json({ message: 'Note deleted!' });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
