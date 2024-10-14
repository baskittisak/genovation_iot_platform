import { Response } from "express";
import { TypedBodyRequest } from "../config/request";
import { IUser } from "./interface/user.interface";
import User from "../models/user.model";

export const register = async (req: TypedBodyRequest<IUser>, res: Response) => {
  try {
    const userCreated = await new User(req.body).save();
    res.send(userCreated);
  } catch (error) {
    console.error(error);
    res.send("Error");
  }
};
