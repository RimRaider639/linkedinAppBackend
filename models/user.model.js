const mg = require("mongoose");

const userSchema = mg.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  city: { type: String, required: true },
});

const User = mg.model("linkedInUser", userSchema);

module.exports = { User };
