import express from "express";
import request from "supertest";
import { router } from "../device.route";

const mockDevice = {
  id: "1",
  name: "Test Device",
  description: "A device for testing",
  feature: ["feature1", "feature2"],
};

const app = express();
app.use(express.json());
app.use("/api", router);

jest.mock("../../middleware/auth.middleware", () => ({
  authCheckToken: jest.fn((_, __, next) => next()),
}));

jest.mock("../../controllers/device.controller", () => ({
  createDevice: jest.fn((_, res) => {
    return res
      .status(201)
      .json({ message: "Device created", device: mockDevice });
  }),
  deleteDevice: jest.fn((_, res) => res.status(200).send()),
  getAllDevice: jest.fn((_, res) => res.status(200).json([mockDevice])),
  getDeviceById: jest.fn((req, res) => {
    if (req.params.id === mockDevice.id) {
      return res.status(200).json(mockDevice);
    }
    return res.status(404).json({ message: "Device not found" });
  }),
  updateDevice: jest.fn((req, res) => {
    if (req.params.id === mockDevice.id) {
      return res.status(200).json({
        message: "Device updated",
        device: { ...mockDevice, ...req.body },
      });
    }
    return res.status(404).json({ message: "Device not found" });
  }),
}));

describe("Device Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a device", async () => {
    const response = await request(app)
      .post("/api/device")
      .send({
        name: "New Device",
        description: "A new device",
        feature: ["feature1"],
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Device created");
    expect(response.body.device).toEqual(mockDevice);
  });

  it("should return 400 for invalid request body (missing fields)", async () => {
    const response = await request(app)
      .post("/api/device")
      .send({ name: "New Device" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("description: Required");
  });

  it("should get all devices", async () => {
    const response = await request(app).get("/api/devices");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockDevice]);
  });

  it("should get device by ID", async () => {
    const response = await request(app).get("/api/device/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDevice);
  });

  it("should return 404 for device not found", async () => {
    const response = await request(app).get("/api/device/999");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Device not found");
  });

  it("should update a device", async () => {
    const response = await request(app)
      .put("/api/device/1")
      .send({
        name: "Updated Device",
        description: "A updated device",
        feature: ["feature updated"],
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Device updated");
    expect(response.body.device.name).toBe("Updated Device");
  });

  it("should return 404 when updating a non-existing device", async () => {
    const response = await request(app)
      .put("/api/device/999")
      .send({
        name: "New Device 999",
        description: "A new device 999",
        feature: ["feature1"],
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Device not found");
  });

  it("should delete a device", async () => {
    const response = await request(app).delete("/api/device/1");

    expect(response.status).toBe(200);
  });
});
