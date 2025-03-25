# VSSUT OLX - Backend Repository

This is the backend for VSSUT OLX, a platform where students can buy and sell used electronics, books, and equipment within the college community.

## 🚀 Tech Stack

- **TypeScript** - Strongly typed JavaScript for better code quality
- **Node.js** - JavaScript runtime for building scalable backend applications
- **Express.js** - Fast and minimalist web framework for Node.js
- **Prisma ORM** - Type-safe database access for PostgreSQL
- **PostgreSQL** - Relational database for storing user data and listings
- **JWT Authentication** - Secure authentication for users

## 📂 Project Structure

```
/backend
│-- src
│   │-- controllers/    # Business logic for handling requests
│   │-- middleware/     # Authentication and validation middleware
│   │-- models/         # Prisma schema and database models
│   │-- routes/         # API routes definitions
│   │-- services/       # Reusable business logic functions
│   │-- utils/          # Utility functions
│   └── index.ts        # Entry point of the server
│-- prisma
│   └── schema.prisma   # Database schema
│-- .env                # Environment variables
│-- package.json        # Project dependencies and scripts
│-- tsconfig.json       # TypeScript configuration
│-- README.md           # Project documentation
```

## 🔧 Setup Instructions

### 1️⃣ Clone the repository
```sh
git clone https://github.com/Gyannnnn/vssut_olx_be.git
cd vssut_olx_be
```

### 2️⃣ Install dependencies
```sh
npm install  # or npm install
```

### 3️⃣ Configure environment variables
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/vssut_olx
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4️⃣ Run database migration
```sh
npm prisma migrate dev  # or npx prisma migrate dev
```

### 5️⃣ Start the server
```sh
npm run  dev  # or yarn dev
```

## 📌 API Endpoints

| Method | Endpoint        | Description              |
|--------|----------------|--------------------------|
| POST   | /auth/signup   | Register a new user      |
| POST   | /auth/login    | Authenticate user        |
| GET    | /items         | Get all listings         |
| POST   | /items         | Create a new listing     |
| GET    | /items/:id     | Get listing details      |
| DELETE | /items/:id     | Delete a listing         |

## 🚀 Future Enhancements
- Payment gateway integration
- Chat functionality for buyers and sellers
- Search and filtering features

## 🤝 Contributing
Feel free to fork the repository and submit pull requests!

---
Developed with ❤️ by Gyanranjan Patra.

