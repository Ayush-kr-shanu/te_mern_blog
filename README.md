# 📝 MERN Blog Application

A full-stack **Blog Web Application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** featuring **authentication, role-based access control, post & comment management**, and a dedicated **Admin Panel**.

---

## 🚀 Features Overview

### ✅ User Authentication

* User **registration**, **login**, and **logout**
* **JWT-based authentication**

  * Access Tokens
  * Refresh Tokens (stored securely)
* **Rate limiting** on authentication routes
* **Secure password hashing** using `bcrypt`
* **OAuth 2.0 social login**

  * Google
* Environment-based configuration using `.env`

---

### 🔐 User Roles & Permissions (RBAC)

Two user roles are supported:

#### 👤 Regular User

* Create, edit, and delete **only their own posts**
* Add, edit, and delete **their own comments**

#### 🛠 Admin

* Manage **all users**
* Manage **all posts**
* Delete **any comment**
* Access to **Admin Dashboard**

> Role-based access control is enforced **at API level using middleware** (not just frontend).

---

### 📰 Post Management

* Full **CRUD** operations for blog posts
* Post fields:

  * Title
  * Content
  * Author
  * Slug (auto-generated)
  * Views
  * Timestamps
* **Soft delete** using `deletedAt`
* Pagination & indexed queries for performance
* MongoDB + Mongoose ODM
* Payload validation using **Joi**

---

### 💬 Comments

* Users can comment on posts
* Comment CRUD operations
* Ownership checks:

  * Users → own comments
  * Admin → all comments
* Comment soft delete support
* Post–Comment relationship via Mongoose references

---

### 🛠 Admin Panel

* React-based **Admin Dashboard**
* Protected using role-based middleware
* Dashboard metrics:

  * Total Users
  * Total Posts
  * Total Comments
* Admin-only APIs for user & post management

---

### 🧩 Architecture & Design

* **Clean Architecture**
* Clear separation of concerns:

  ```
  src/
  ├── config/
  ├── controllers/
  ├── services/
  ├── models/
  ├── routes/
  ├── middlewares/
  ├── validation/
  ├── utils/
  ```
* Business logic handled inside **service layer**
* Centralized error handling
* Reusable & modular middleware

---

### ⚡ Performance Optimization

* MongoDB indexing
* Pagination for posts
* Controlled population to avoid over-fetching

---

### 🧪 Testing

* Unit & Integration tests using **Jest**
* Auth API tests
* Post API tests
* Structured test setup with separate test environment

---

## 🌐 Frontend (React)

* Functional components with **Hooks**
* Authentication state managed globally using **Context API**
* Protected routes:

  * Authenticated users
  * Admin-only routes
* Clean UI with role-based navigation

## 🧰 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT
* Passport.js (OAuth) - Google
* Joi (Validation)
* Jest (Testing)

### Frontend

* React.js
* React Router
* Context API
* Axios

---

## ⚙️ Environment Setup

Create a `.env` file in the backend root:

```env
# Server
NODE_ENV=development
PORT=4500

# Database
MONGODB_URI=mongodb+srv://ayush:ayush@cluster0.lo4qsjy.mongodb.net/blog

# JWT
JWT_SECRET=secret
REFRESH_SECRET=ref-secret

# Session
SESSION_SECRET=session-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-google-clientId
GOOGLE_CLIENT_SECRET=secret

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

---

## 📦 Installation Instructions

### 1️⃣ Clone Repository

```bash
git clone <https://github.com/Ayush-kr-shanu/te_mern_blog.git>
cd te_mern_blog
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔌 API Overview (Sample)

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | /api/auth/register   | Register user         |
| POST   | /api/auth/login      | Login user            |
| GET    | /api/post            | Get posts (paginated) |
| POST   | /api/post            | Create post           |
| PUT    | /api/post/:id        | Update post           |
| DELETE | /api/post/:id        | Soft delete post      |
| POST   | /api/comment/:postId | Add comment           |
| DELETE | /api/admin/post/:id  | Admin force delete    |

---

## 🎥 Demo Video

📌 **5–10 minute demo includes:**

* Authentication flow
* Admin dashboard
* Post & comment management
* Role-based access

---

## 📊 Evaluation Highlights

✔ Clean architecture
✔ Secure authentication
✔ RBAC at API level
✔ Maintainable & scalable design
✔ Well-documented

---

## 👨‍💻 Author

**Ayush Kumar Shanu**