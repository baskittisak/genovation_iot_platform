import { Request, Response } from "express";
import { IDevice, IDeviceId } from "./interface/device.interface";
import {
  TypedBodyRequest,
  TypedParamsRequest,
  TypedRequest,
} from "../config/request.config";
import Device from "../models/device.model";

export const createDevice = async (
  req: TypedBodyRequest<IDevice>,
  res: Response
) => {
  try {
    await new Device(req.body).save();
    res.status(201).json({ message: "Device created successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const getAllDevice = async (_: Request, res: Response) => {
  try {
    const allDevices = await Device.find({}).exec();
    const devices = allDevices.map((device) => ({
      ...device.toObject(),
      id: device._id,
      _id: undefined,
    }));

    res
      .status(200)
      .json({ data: devices, message: "Device retrieved successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const getDeviceById = async (
  req: TypedParamsRequest<IDeviceId>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const device = await Device.findOne({ _id: id }).exec();

    if (device) {
      const formattedDevice = {
        id: device._id.toString(),
        ...device.toObject(),
        _id: undefined,
      };

      res.status(200).json({
        data: formattedDevice,
        message: "Device retrieved successfully",
      });
    } else {
      res.status(404).json({ message: "Device not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const updateDevice = async (
  req: TypedRequest<IDevice, IDeviceId>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const device = await Device.findOne({ _id: id }).exec();

    if (device) {
      const deviceUpdated = await Device.findOneAndUpdate(
        { _id: id },
        req.body,
        {
          new: true,
        }
      ).exec();

      res.status(200).json({
        data: deviceUpdated,
        message: "Device updated successfully",
      });
    } else {
      res.status(404).json({ message: "Device not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const deleteDevice = async (
  req: TypedRequest<IDevice, IDeviceId>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const device = await Device.findOne({ _id: id }).exec();

    if (device) {
      await Device.findOneAndDelete({ _id: id }).exec();

      res.status(200).json({
        message: "Device deleted successfully",
      });
    } else {
      res.status(404).json({ message: "Device not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
