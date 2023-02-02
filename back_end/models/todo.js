const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
  activity: { type: String, required: true },
  status: { type: String, required: true },
  timeTaken: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Todo", todoSchema);
