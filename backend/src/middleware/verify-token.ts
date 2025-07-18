import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../interfaces/user.interface";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).send("No token provided");
      return;
    }

    if (!JWT_SECRET || typeof JWT_SECRET !== "string") {
      res.status(500).send("JWT secret key is not configured");
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };

    req.userId = decoded.userId;
    req.role = decoded.role;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyToken;
