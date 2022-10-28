const { calculateTip } = require("../src/math");

test("Should calculate total with the tip", () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
  //   if (total !== 13) {
  //     throw new Error(`Total tip should be 13. Got ${total}`)};
});

// test("Hello World", () => {});

// test("This should fail", () => {
//   throw new Error("Failure");
// });
