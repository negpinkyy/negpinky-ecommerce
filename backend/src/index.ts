// app.ts - Fixed middleware order
import express, { Request, Response, Application } from "express";

interface AppConfig {
  port: number;
  environment: string;
}

const config: AppConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 8001,
  environment: process.env.NODE_ENV || "development",
};

const app: Application = express();
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// MIDDLEWARE SETUP FIRST - BEFORE ROUTES
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true 
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES SETUP AFTER MIDDLEWARE
import authRoutes from './users/user.route';
app.use('/api/auth', authRoutes);

// Database connection
main()
  .then(() => console.log("MongoDB is successfully connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
  
  app.get("/", (req: Request, res: Response): void => {
    res.send("Hello World!");
  });
}

app.get("/api/status", (req: Request, res: Response): void => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: config.environment,
  });
});

// 404 handler - should be last
app.use((req: Request, res: Response): void => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
  });
});

const server = app.listen(config.port, (): void => {
  console.log(`🚀 Example app listening on port ${config.port}`);
  console.log(`🔧 Environment: ${config.environment}`);
});

process.on("SIGTERM", (): void => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});

export default app;