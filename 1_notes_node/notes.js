const fs = require('fs');

function fetchNotes() {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
}

function saveNotes(notes) {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
  var notes = [];
  var note = { title, body };

  var notes = fetchNotes();

  var duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  return fetchNotes();
};

var getNote = title => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter(note => note.title === title);
  return filteredNotes[0];
};

var removeNote = title => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter(note => note.title !== title);

  saveNotes(filteredNotes);

  return filteredNotes.length !== notes.length;
};

var logNote = note => {
  debugger;
  if (note) {
    console.log('Note found');
    console.log('---');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  } else {
    console.log('Note not found');
  }
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote,
};
