import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../utils/authUtils.js";

export default {
  createUser(userData) {
    return User.create(userData);
  },
  async login({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) {
      return new Error("User does not exist!");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) return new Error("Password is not valid. Please try again!");

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: "2h" });

    return token;
  },
};
