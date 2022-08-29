//CRUd create read update and delete

const mongodb = require("mongodb");

// const mongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId;

const { MongoClient, ObjectId } = mongodb;

const connectionURL = "mongodb://127.0.0.1:27017";

const databaseName = "task-manager";

const id = new ObjectId();

console.log(id);

console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log("Unable to connect to database");
  }

  const db = client.db(databaseName);

  db.collection("users").insertOne(
    {
      name: "Tola",
      age: 25,
    },
    (err, result) => {
      if (err) {
        return console.log("Unable to insert user");
      }
      console.log(result);
    }
  );

  //   db.collection("users").insertMany(
  //     [
  //       {
  //         name: "Gabriel",
  //         age: 23,
  //       },
  //       {
  //         name: "Tricia",
  //         age: 20,
  //       },
  //     ],
  //     (err, result) => {
  //       if (err) {
  //         return console.log("unable to inset users");
  //       }
  //       console.log(result);
  //     }
  //   );
  //   db.collection("tasks").insertMany(
  //     [
  //       {
  //         description: "Buying palm oil",
  //         completed: true,
  //       },
  //       {
  //         description: "wanking",
  //         completed: true,
  //       },
  //       {
  //         decription: "washing clothes",
  //         completed: true,
  //       },
  //     ],
  //     (err, result) => {
  //       if (err) {
  //         return console.log("Unable to add tasks");
  //       }
  //       console.log(result);
  //     }
  //   );
});
