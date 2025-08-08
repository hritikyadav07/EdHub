import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import routes
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import enrollmentRoutes from "./routes/enrollments.js";
import adminRoutes from "./routes/admin.js";

// Load config
dotenv.config();
const mongoUri = process.env.MONGO_URI;

// Connect to database
mongoose
  .connect(mongoUri, { dbName: "edhub" })
  .then(() => console.log("MongoDB connected successfully...!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Initialize app
const app = express();

app.use(
  cors({
    origin: "*", // TEMPORARILY allow all
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EdHub API" });
});

// Mount routers
app.use("/api/auth", authRoutes); //all auth routes working properly - tested with postman
app.use("/api/courses", courseRoutes); //all course routes working properly - tested with postman
app.use("/api/enrollments", enrollmentRoutes); //all enrollment routes working properly - tested with postman
app.use("/api/admin", adminRoutes); //all admin routes working properly - tested with postman

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
