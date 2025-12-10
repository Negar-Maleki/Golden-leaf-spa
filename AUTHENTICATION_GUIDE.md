# User Authentication & JWT Testing Guide

## ✅ What Was Created:

### 1. **User Model** (Prisma)

```prisma
model User {
  id            Int       @id @default(autoincrement())
  email         String    @unique
  name          String?
  passwordHash  String?   // for local auth
  googleId      String?   @unique // for Google OAuth
  githubId      String?   @unique // for GitHub OAuth
  role          String    @default("user")
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 2. **Test Users Created in Database**

| Email             | Password    | Role  |
| ----------------- | ----------- | ----- |
| user@example.com  | password123 | user  |
| admin@example.com | admin123    | admin |
| test@example.com  | test123     | user  |

### 3. **Authentication Flow**

#### **Step 1: Login (Get Token)**

```bash
POST http://localhost:5000/api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

#### **Step 2: Use Token to Access Protected Routes**

```bash
GET http://localhost:5000/api/bookings
Authorization: Bearer YOUR_TOKEN_HERE
```

Or using cookies (if logged in from same domain):

```bash
GET http://localhost:5000/api/bookings
# Cookie will be sent automatically
```

### 4. **Protected Routes** (Require Authentication)

- `GET /api/services` - List services
- `GET /api/customers` - List customers
- `POST /api/bookings` - Create booking
- `GET /api/settings` - Get settings

### 5. **Passport Strategies Implemented**

1. **Local Strategy** - Email + Password
   - Route: `POST /api/login`
2. **Google OAuth** - Google Sign-In

   - Routes:
     - `GET /api/login/auth/google` - Initiate login
     - `GET /api/login/auth/google/callback` - Handle callback

3. **JWT Integration**
   - Tokens generated automatically
   - Stored in httpOnly cookies (secure)
   - Verified on protected routes

### 6. **Key Features**

✅ Passwords hashed with bcrypt  
✅ JWT tokens with 15-minute expiration  
✅ httpOnly cookies (XSS protection)  
✅ CORS enabled for frontend  
✅ Role-based user system ready  
✅ Google OAuth support

## 🧪 Testing Commands

### Using cURL:

```bash
# Login
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get bookings (with token)
curl http://localhost:5000/api/bookings \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman:

1. POST `http://localhost:5000/api/login`
2. Body: `{"email":"user@example.com","password":"password123"}`
3. Copy the token from response
4. In next request, set Authorization header: `Bearer TOKEN`

---

**Everything is ready for frontend integration! 🎉**
