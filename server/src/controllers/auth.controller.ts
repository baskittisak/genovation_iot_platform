import { Response } from "express";
import { TypedBodyRequest } from "../config/request";
import { IUser } from "./interface/user.interface";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

export const register = async (req: TypedBodyRequest<IUser>, res: Response) => {
  try {
    const { username, password, email } = req.body;

    const user = await User.findOne({ username, email });
    if (user) {
      res.status(409).json({ message: "User Already Exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(password, salt);
      const newUser = {
        username,
        password: passwordHashed,
        email,
      };

      await new User(newUser).save();
      res.status(200).json({ message: "User Registered" });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
