const request = require("supertest");
const app = require("../src/app");

beforeAll(() => {
  process.env.NODE_ENV = "test";
});

describe("Auth API", () => {
  it("should register user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Ayush",
        email: "ayush1@test.com",
        password: "password123",
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("accessToken");
  });

  it("should login user", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Ayush",
      email: "ayush1@test.com",
      password: "password123",
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "ayush1@test.com",
        password: "password123",
      });

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("accessToken");
  });
});
