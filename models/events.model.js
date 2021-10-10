const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Creation of Event Schema
const eventsSchema = new Schema({
  email: { type: String, lowercase: true, required: true },
  date: { type: Number, required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  time: { type: Number, required: true },
  event: { type: String, required: true },
});

const SignUp = mongoose.model("Events", eventsSchema);

module.exports = SignUp;
