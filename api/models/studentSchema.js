const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  regCode: String,

  studentNames: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  studentPhone: {
    type: String,
    required: true,
  },

  studentEmail: {
    type: String,
    required: true,
  },

  studentAddress: {
    type: String,
    required: true,
  },

  courseDuration: {
    type: String,
    required: true,
  },

  courseOfStudy: {
    type: String,
    required: true,
  },

  guardianName: {
    type: String,
    required: true,
  },

  relationship: {
    type: String,
    required: true,
  },

  trainingFees: {
    type: String,
    required: true,
  },

  amountDeposited: {
    type: String,
    required: true,
  },

  balance: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  password: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

studentSchema.pre("save", async function (next) {
  let user = this;
  const SALT_ROUNDS = 10;

  // only hash the password if it has been modified (or is new)
  if (!user.regCode) user.regCode = nanoid(11);

  try {
    // This is based on the premise that the "save" function is NEVER used on update
    user.password = await bcrypt.hash(user.regCode, SALT_ROUNDS);
    next();
  } catch {
    return next();
  }
});

studentSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);

};

module.exports = mongoose.model("student", studentSchema);

