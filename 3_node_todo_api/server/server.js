require('./config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');

var { Todo } = require('./models/Todo');
var { User } = require('./models/User');

var PORT = process.env.PORT;

var app = express();

app.use(bodyParser.json());

app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    e => {
      res.status(400).send(e);
    },
  );
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({});
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) return res.status(404).send({});
      return res.status(200).send({ todo });
    })
    .catch(e => {
      res.status(400).send({});
    });
});

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text,
  });

  todo.save().then(
    doc => {
      res.status(200).send(doc);
    },
    err => {
      res.status(404).send(err);
    },
  );
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({});
  }

  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) return res.status(404).send({});

      return res.status(200).send({ todo });
    })
    .catch(e => res.status(400).send({}));
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({});
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(
    id,
    {
      $set: body,
    },
    { new: true },
  )
    .then(todo => {
      if (!todo) return res.status(404).send();

      res.status(200).send({ todo });
    })
    .catch(e => res.status(400).send());
});

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));

module.exports = { app };
