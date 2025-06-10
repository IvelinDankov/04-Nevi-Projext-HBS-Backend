import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

let lettersValidation = /^[a-zA-Z0-9 ]*$/;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
    validate: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Must be a valid email!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    validate: [
      lettersValidation,
      "Password need to me English letters and characters only",
    ],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 14);
});

const User = model("User", userSchema);

export default User;
