const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './Develop/public/notes.html')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './Develop/public/index.html')));

app.get('/api/notes', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;

// Read notes
app.get('/api/notes', (req, res) => {
    const saveNotes = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json')));
    res.json(saveNotes);
  });
  
  // Create new note
  app.post('/api/notes', (req, res) => {
    const saveNotes = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json')));
    saveNotes.push({ ...req.body, id: uuidv4() });
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(saveNotes));
    res.json({ message: "You've saved a note!" });
  });
  
  // Delete note
  app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    let saveNotes = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json')));
    saveNotes = saveNotes.filter(note => note.id !== id);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(saveNotes));
    res.json({ message: 'Note deleted!' });
  });
  

  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    notes.push(newNote);
    fs.writeFile('db.json', JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.status(200).end();
    });
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
