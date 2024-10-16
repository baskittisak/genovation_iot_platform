import request from "supertest";
import express from "express";
import { router } from "../auth.route";

const app = express();
app.use(express.json());
app.use("/api", router);

jest.mock("../../controllers/auth.controller", () => ({
  register: jest.fn((_, res) =>
    res.status(200).json({ message: "User registered" })
  ),
  login: jest.fn((_, res) =>
    res.status(200).json({ message: "Login successful" })
  ),
}));

describe("Auth Routes", () => {
  describe("POST /api/register", () => {
    it("should register a user successfully", async () => {
      const response = await request(app).post("/api/register").send({
        username: "testuser",
        password: "password123",
        email: "test@example.com",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "User registered" });
    });

    it("should return 400 for invalid request body", async () => {
      const response = await request(app).post("/api/register").send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    });
  });

  describe("POST /api/login", () => {
    it("should log in a user successfully", async () => {
      const response = await request(app).post("/api/login").send({
        username: "testuser",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Login successful" });
    });

    it("should return 400 for invalid request body", async () => {
      const response = await request(app).post("/api/login").send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    });
  });
});
