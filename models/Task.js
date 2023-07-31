const moongose = require("mongoose");
const uuid = require("uuid");

const TaskSchema = new moongose.Schema({
  _id: { type: String, required: true, default: uuid.v4, identifier: true },
  name: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
});

module.exports = moongose.model("Task", TaskSchema);
