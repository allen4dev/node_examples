// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');

  // db.collection('Todos').deleteMany({ text: 'Some Text' }).then(result => {
  //   console.log(result);
  // });

  // db
  //   .collection('Todos')
  //   .deleteOne({ text: 'Learn Nodejs' })
  //   .then(result => console.log(result));

  // db
  //   .collection('Todos')
  //   .findOneAndDelete({ _id: new ObjectID('59c83d0156bc3373631f4017') })
  //   .then(result => console.log(result));

  // db
  //   .collection('Users')
  //   .deleteMany({ name: 'Alan Aliaga' })
  //   .then(result => console.log(result));

  // db
  //   .collection('Users')
  //   .findOneAndDelete({ _id: 123 })
  //   .then(result => console.log(result));

  db.close();
});
