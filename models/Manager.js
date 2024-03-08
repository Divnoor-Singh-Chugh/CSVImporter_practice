const mongoose = require("mongoose");
const managerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
