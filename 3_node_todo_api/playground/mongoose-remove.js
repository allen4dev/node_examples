const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/Todo');
const { User } = require('./../server/models/User');

Todo.remove({}).then(result => {
  console.log(result);
});

Todo.findByIdAndRemove('59caa2a4b1aab65fd34d671c').then(todo => {});
Todo.findOneAndRemove({ _id: '59caa2a4b1aab65fd34d671c' }).then(todo => {});
