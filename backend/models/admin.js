const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

// static login method
adminSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const admin = await this.findOne({ email });

  if (!admin) {
    throw Error("Incorrect login credentials");
  }

  if (password !== admin.password) {
    throw Error("Incorrect login credentials");
  }

  return admin;
};

module.exports = mongoose.model("Admin", adminSchema);
