const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

const userOne = {
  name: "Mike",
  email: "mike@example.com",
  password: "56G2undnd!4654",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

afterEach(() => {
  console.log("afterEach");
});

test("Should signup a new user", async () => {
  try {
    await request(app)
      .post("/users")
      .send({
        name: "Andrew",
        email: "gabriel@gmail.com",
        password: "Tdeidemincexxwidme$123!",
      })
      .expect(201);
  } catch (e) {
    console.log(e);
  }
});

test("Should login a new user", async () => {
  try {
    await request(app)
      .post("/users/login")
      .send({
        email: "wdewd@wdned.com",
        password: "uwdnwdnk1235",
      })
      .expect(400);
  } catch (e) {
    console.log(e);
  }
});
