const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/Todo');
const { User } = require('./../server/models/User');

// var id = '59c986d6370aa0a52e51d0a3';

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({ _id: id }).then(todos => {
//   if (todos.length === 0) return console.log('todos not found');

//   console.log('Todos', todos);
// });

// Todo.findOne({ _id: id }).then(todo => {
//   if (!todo) return console.log('Todo not found');
//   console.log('Todo', todo);
// });

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) return console.log('Id not found');
//     console.log('Todo', todo);
//   })
//   .catch(console.log);

const userID = '59c98a13dbe5c00595937219';

User.findById(userID).then(user => {
  if (!user) {
    return console.log('Unable to find user');
  }

  console.log(JSON.stringify(user, undefined, 2));
}, console.log);
