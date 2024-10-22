import express from "express";
import { validateBodyRequest } from "../middleware/validate.middleware";
import { typeUser } from "../models/user.model";
import { register, login, logout } from "../controllers/auth.controller";
import { authCheckToken } from "../middleware/auth.middleware";

export const router = express.Router();

router.post("/register", validateBodyRequest(typeUser), register);
router.post("/login", validateBodyRequest(typeUser), login);
router.post("/logout", authCheckToken, logout);
