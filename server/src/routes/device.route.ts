import express from "express";
import {
  createDevice,
  deleteDevice,
  getAllDevice,
  getDeviceById,
  updateDevice,
} from "../controllers/device.controller";
import { authCheckToken } from "../middleware/auth.middleware";
import { validateBodyRequest } from "../middleware/validate.middleware";
import { typeDevice } from "../models/device.model";

export const router = express.Router();

router.post(
  "/device",
  authCheckToken,
  validateBodyRequest(typeDevice),
  createDevice
);
router.get("/devices", authCheckToken, getAllDevice);
router.get("/device/:id", authCheckToken, getDeviceById);
router.put(
  "/device/:id",
  authCheckToken,
  validateBodyRequest(typeDevice),
  updateDevice
);
router.delete("/device/:id", authCheckToken, deleteDevice);
