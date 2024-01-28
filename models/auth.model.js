const { default: mongoose } = require("mongoose");

const authSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const authModel = mongoose.model("passportLocal", authSchema);
module.exports = authModel;
