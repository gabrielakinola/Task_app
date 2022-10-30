const request = require("supertest");
const app = require("../src/app");

jest.setTimeout(20000);
test("Should signup a new user", async () => {
  await request(app)
    .post("/users")

    .send({
      name: "Andrew",
      email: "gabriel@gmail.com",
      password: "Testpassword@123",
    })
    .expect(201);
});
