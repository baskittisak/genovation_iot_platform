import express from "express";
import { validateBodyRequest } from "../middleware/validate.middleware";
import { typeUser } from "../models/user.model";
import { register, login } from "../controllers/auth.controller";

export const router = express.Router();

router.post("/register", validateBodyRequest(typeUser), register);
router.post("/login", validateBodyRequest(typeUser), login);
