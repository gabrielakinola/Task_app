//CRUd create read update and delete

const mongodb = require("mongodb");

// const mongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId;

const { MongoClient, ObjectId } = mongodb;

const connectionURL = "mongodb://127.0.0.1:27017";

const databaseName = "task-manager";

// const id = new ObjectId();

// console.log(id);

// console.log(id.getTimestamp());

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

    db.collection("users").insertMany(
      [
        {
          name: "Gabriel",
          age: 23,
        },
        {
          name: "Tricia",
          age: 20,
        },
      ],
      (err, result) => {
        if (err) {
          return console.log("unable to inset users");
        }
        console.log(result);
      }
    );
  db.collection("tasks").insertMany(
    [
      {
        description: "Sweeping",
        completed: false,
      },
      {
        description: "Watching movie",
        completed: false,
      },
      {
        description: "washing plates",
        completed: true,
      },
    ],
    (err, result) => {
      if (err) {
        return console.log("Unable to add tasks");
      }
      console.log(result);
    }
  );

  db.collection("users").findOne(
    { _id: new ObjectId("630cdcbd17cf45685543a031") },
    (err, user) => {
      if (err) {
        console.log("unable to fetch");
      } else {
        console.log(user);
      }
    }
  );

  db.collection("users")
    .find({ age: 27 })
    .toArray((err, users) => {
      if (err) {
        console.log("Unable to fetch");
      } else {
        console.log(users);
      }
    });

  db.collection("tasks").findOne(
    { _id: ObjectId("630e014b95de6044e9440919") },
    (err, task) => {
      if (err) {
        return console.log("unable to fetch");
      }
      console.log(task);
    }
  );
  db.collection("tasks")
    .find({ completed: true })
    .toArray((err, tasks) => {
      if (err) {
        return console.log("unable to fetch completed tasks");
      }
      console.log(tasks);
    });

  Updating documents
  db.collection("tasks")
    .updateMany(
      {
        completed: false,
      },
      {
        $set: {
          completed: true,
        },
      }
    )
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });

  db.collection("users")
    .deleteMany({ age: 27 })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
});
