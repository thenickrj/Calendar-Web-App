const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Creation of Schema
const signUpSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const SignUp = mongoose.model("Signup", signUpSchema);

module.exports = SignUp;
