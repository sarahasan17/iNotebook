const mongoose = require("mongoose");

const notesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default:"general"
  },
  date: {
    type: Date,
    required: Date.now,
  },
});

model.exports = mongoose.model("notes", notesSchema);
