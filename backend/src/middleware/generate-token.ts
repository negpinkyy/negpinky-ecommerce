// middleware/generate-token.ts
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import User from "../users/user.model";

// Define the JWT payload interface
interface JWTPayload {
  userId: string;
  role: string;
}

// Token generation function with proper TypeScript
const generateToken = async (userId: string | Types.ObjectId): Promise<string> => {
  try {
    // Check if JWT_SECRET exists
    const JWT_SECRET = process.env.JWT_SECRET_KEY;
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET_KEY is not defined in environment variables");
    }

    // Find user by ID
    const user = await User.findById(userId) as InstanceType<typeof User> | null;
    if (!user) {
      throw new Error("User not found");
    }

    // Create JWT payload
    const payload: JWTPayload = {
      userId: user._id.toString(),
      role: user.role || 'user'
    };

    // Generate token
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;

  } catch (error) {
    console.error("Token generation error:", error);
    throw new Error(
      `Token generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export default generateToken;