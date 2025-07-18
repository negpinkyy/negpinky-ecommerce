import { Document } from 'mongoose';

export interface IUser extends Document {
 _id: string;
  username: string;
  email: string;
  password: string;
  role?: string;
  profileImage?: string;
  bio?: string;
  profession?: string;
  createdAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface AuthenticatedRequest extends Request {
  cookies: any;
  userId?: string;
  role?: string;
}