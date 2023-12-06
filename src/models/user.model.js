const { Schema, model, default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email_address: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    phone_number: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    address: {
      address_array: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Address",
        },
      ],
      is_default: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePW = async function (pw) {
  return await bcrypt.compare(pw, this.password);
};
const User = model("User", userSchema);
module.exports = User;
