import express from "express";
import {
  createDevice,
  deleteDevice,
  getAllDevice,
  getDeviceById,
  updateDevice,
} from "../controllers/device.controller";
import { authCheckToken } from "../middleware/auth.middleware";

export const router = express.Router();

router.post("/device", authCheckToken, createDevice);
router.get("/devices", authCheckToken, getAllDevice);
router.get("/device/:id", authCheckToken, getDeviceById);
router.put("/device/:id", authCheckToken, updateDevice);
router.delete("/device/:id", authCheckToken, deleteDevice);
