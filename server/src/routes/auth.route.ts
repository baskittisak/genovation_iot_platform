import express from "express";
import { validateTypeRequest } from "../middleware/validate.middleware";
import { typeRegister, typeLogin } from "../models/user.model";
import { register, login } from "../controllers/auth.controller";

export const router = express.Router();

router.post("/register", validateTypeRequest(typeRegister), register);
router.post("/login", validateTypeRequest(typeLogin), login);
