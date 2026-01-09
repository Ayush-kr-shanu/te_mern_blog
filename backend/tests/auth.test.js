const request = require("supertest")
const mongoose = require("mongoose")
const app = require("../server")
const User = require("../models/User")

describe("Authentication Routes", () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_TEST_URI || "mongodb://localhost:27017/mern-blog-test")
  })

  afterAll(async () => {
    // Clean up
    await User.deleteMany({})
    await mongoose.connection.close()
  })

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/api/auth/register").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      })

      expect(res.statusCode).toBe(201)
      expect(res.body.token).toBeDefined()
      expect(res.body.user.email).toBe("test@example.com")
    })

    it("should not register user with existing email", async () => {
      await request(app).post("/api/auth/register").send({
        username: "user1",
        email: "existing@example.com",
        password: "password123",
      })

      const res = await request(app).post("/api/auth/register").send({
        username: "user2",
        email: "existing@example.com",
        password: "password123",
      })

      expect(res.statusCode).toBe(400)
      expect(res.body.message).toContain("User already exists")
    })
  })

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      const user = new User({
        username: "logintest",
        email: "login@example.com",
        password: "password123",
      })
      await user.save()
    })

    it("should login user with correct credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "login@example.com",
        password: "password123",
      })

      expect(res.statusCode).toBe(200)
      expect(res.body.token).toBeDefined()
    })

    it("should not login with incorrect password", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "login@example.com",
        password: "wrongpassword",
      })

      expect(res.statusCode).toBe(401)
    })
  })
})
