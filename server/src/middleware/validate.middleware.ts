import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validateTypeRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorDetail = error.errors[0];
        const message = errorDetail.path[0] + ": " + errorDetail.message;
        res.status(400).json({ message });
      } else {
        next(error);
      }
    }
  };
};
