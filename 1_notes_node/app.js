const fs = require('fs');
const yargs = require('yargs');
const _ = require('lodash');

const notes = require('./notes');

var titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't',
};

var bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b',
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions,
  })
  .command('list', 'List all notes')
  .command('read', 'Read an individual note', {
    title: titleOptions,
  })
  .command('remove', 'Remove an individual note', {
    title: titleOptions,
  })
  .help().argv;
var command = process.argv[2];

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);

  notes.logNote(note);
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing: ${allNotes.length} notes(s)`);
  allNotes.forEach(note => notes.logNote(note));
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  notes.logNote(note);
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}
