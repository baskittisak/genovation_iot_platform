import express from "express";
import {
  createDevice,
  deleteDevice,
  getAllDevice,
  getDeviceById,
  updateDevice,
} from "../controllers/device.controller";

export const router = express.Router();

router.post("/device", createDevice);
router.get("/devices", getAllDevice);
router.get("/device/:id", getDeviceById);
router.put("/device/:id", updateDevice);
router.delete("/device/:id", deleteDevice);
