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
      if (!SECRET_KEY) {
        res
          .status(500)
          .json({ message: "Internal server error: Missing SECRET_KEY" });
        return;
      }

      jwt.verify(token, SECRET_KEY);
      next();
    } else {
      res
        .status(401)
        .json({ message: "No token provided, authorization denied" });
    }
  } catch (error) {
    res.status(403).json({ message: "Token is expired" });
  }
};
