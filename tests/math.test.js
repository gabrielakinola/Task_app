const { calculateTip, add } = require("../src/math");

test("Should calculate total with the tip", () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
  //   if (total !== 13) {
  //     throw new Error(`Total tip should be 13. Got ${total}`)};
});

test("Should calculate total with default tip", () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5);
});

// test("async test demo", (done) => {
//   setTimeout(() => {
//     expect(1).toBe(2);
//     done();
//   }, 2000);
// });

test("Should add two numbers", (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

test("Should add two numbers async/await", async () => {
  const sum = await add(10, 5);
  expect(sum).toBe(15);
});

// test("Hello World", () => {});

// test("This should fail", () => {
//   throw new Error("Failure");
// });
