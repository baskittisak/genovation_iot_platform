import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authCheckToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
      const { SECRET_KEY } = process.env;
      if (!SECRET_KEY) throw "Internal server error: Missing SECRET_KEY";

      jwt.verify(token, SECRET_KEY);
      next();
    } else {
      res
        .status(401)
        .json({ message: "No token provided, authorization denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Token is not valid" });
  }
};
