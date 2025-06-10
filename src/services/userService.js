import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../utils/authUtils.js";

export default {
  createUser(email, password) {
    return User.create({ email, password });
  },
  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User does not exist!");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) throw new Error("Password is not valid. Please try again!");

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: "2h" });

    return token;
  },
};
