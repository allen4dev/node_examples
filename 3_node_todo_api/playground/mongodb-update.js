// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');

  // db
  //   .collection('Todos')
  //   .findOneAndUpdate(
  //     {
  //       _id: new ObjectID('59c95360dbe5c00595937214'),
  //     },
  //     {
  //       $set: {
  //         completed: true,
  //       },
  //     },
  //     {
  //       returnOriginal: false,
  //     },
  //   )
  //   .then(result => {
  //     console.log(result);
  //   });

  db
    .collection('Users')
    .findOneAndUpdate(
      {
        _id: new ObjectID('59c95afcdbe5c00595937218'),
      },
      {
        $set: {
          name: 'Alan Aliaga',
        },
        $inc: {
          age: 1,
        },
      },
      {
        returnOriginal: false,
      },
    )
    .then(console.log);

  db.close();
});
