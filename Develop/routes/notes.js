// Import all the require packages
const note = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the notes
note.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a notes
note.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

note.delete('/:id', (req, res) => {
  const params = req.params.id

  fs.readFile(`./db/db.json`, "utf8", (err, data) => {
    const givenData = JSON.parse(data);

    const noteFilter = givenData.filter(notes => {
      return notes.id !== params;
    });
    res.json(noteFilter)
    fs.writeFile('./db/db.json', JSON.stringify(noteFilter), (err) => {
      if (err) {
        console.error(err)
      } else {
        console.log('note deleted')
      }
    });
  });
});




module.exports = note;