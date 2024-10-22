import { Request, Response } from "express";
import { TypedBodyRequest } from "../config/request.config";
import { IUser } from "./interface/user.interface";
import { blacklist } from "../middleware/auth.middleware";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: TypedBodyRequest<IUser>, res: Response) => {
  try {
    const { username, password, email } = req.body;

    const user = await User.findOne({ username, email });
    if (user) {
      res.status(409).json({ message: "User already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(password, salt);
      const newUser = {
        username,
        password: passwordHashed,
        email,
      };

      await new User(newUser).save();
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

const signJwtToken = (user: IUser, res: Response) => {
  const payload = {
    username: user.username,
    email: user.email,
  };

  const { SECRET_KEY } = process.env;
  if (!SECRET_KEY) throw "Internal server error: Missing SECRET_KEY";

  jwt.sign(
    payload,
    SECRET_KEY,
    {
      expiresIn: "1h",
    },
    (error, token) => {
      if (error) throw error;
      res.status(200).json({ data: token, message: "User login successfully" });
    }
  );
};

export const login = async (req: TypedBodyRequest<IUser>, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = (await User.findOne({ username })) as IUser;

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        signJwtToken(user, res);
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token) {
      blacklist.add(token);
      res.status(200).json({ message: "User logout successfully" });
    } else {
      res
        .status(401)
        .json({ message: "No token provided, authorization denied" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
