import express from "express";
import { validateTypeRequest } from "../middleware/validate.middleware";
import { typeUser } from "../models/user.model";
import { register, login } from "../controllers/auth.controller";

export const router = express.Router();

router.post("/register", validateTypeRequest(typeUser), register);
router.post("/login", validateTypeRequest(typeUser), login);
