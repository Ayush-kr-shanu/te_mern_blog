const request = require("supertest")
const mongoose = require("mongoose")
const app = require("../server")
const Post = require("../models/Post")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

describe("Post Routes", () => {
  let userId
  let token
  let postId

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI || "mongodb://localhost:27017/mern-blog-test")

    const user = new User({
      username: "posttest",
      email: "posttest@example.com",
      password: "password123",
    })
    await user.save()
    userId = user._id
    token = jwt.sign({ id: userId }, process.env.JWT_SECRET || "your-secret-key")
  })

  afterAll(async () => {
    await Post.deleteMany({})
    await User.deleteMany({})
    await mongoose.connection.close()
  })

  describe("GET /api/posts", () => {
    it("should get all published posts", async () => {
      const post = new Post({
        title: "Test Post",
        content: "Test content",
        author: userId,
      })
      await post.save()
      postId = post._id

      const res = await request(app).get("/api/posts")

      expect(res.statusCode).toBe(200)
      expect(res.body.posts).toBeInstanceOf(Array)
      expect(res.body.pagination).toBeDefined()
    })
  })

  describe("POST /api/posts", () => {
    it("should create a new post with authentication", async () => {
      const res = await request(app).post("/api/posts").set("Authorization", `Bearer ${token}`).send({
        title: "New Test Post",
        content: "New test content",
        category: "Technology",
      })

      expect(res.statusCode).toBe(201)
      expect(res.body.post.title).toBe("New Test Post")
    })

    it("should not create post without authentication", async () => {
      const res = await request(app).post("/api/posts").send({
        title: "Unauthorized Post",
        content: "Should fail",
      })

      expect(res.statusCode).toBe(401)
    })
  })
})
