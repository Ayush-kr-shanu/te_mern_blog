const request = require("supertest");
const app = require("../src/app");

beforeAll(() => {
  process.env.NODE_ENV = "test";
});

describe("Post API", () => {
  let token;

  beforeEach(async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Admin",
      email: "admin@test.com",
      password: "password123",
    });
    token = res.body.data.accessToken;
  });

  it("should create a post", async () => {
    const res = await request(app)
      .post("/api/post")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Post",
        content: "Test content",
      });

    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe("Test Post");
  });

  it("should fetch posts", async () => {
    const res = await request(app).get("/api/post");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
