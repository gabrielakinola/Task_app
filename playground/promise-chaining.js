require("../src/db/mongoose");

const User = require("../src/models/user");

// User.findByIdAndUpdate("6320569e7e65decdc93aad27", { age: 27 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 27 }).then((result) => {
//       console.log(result);
//     });
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return { count, user };
};

updateAgeAndCount("6320569e7e65decdc93aad27", 2)
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
