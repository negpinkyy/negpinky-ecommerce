export interface RegisterUserPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user: User;
}
export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  profileImage?: string;
  bio?: string;
  profession?: string;
  createdAt: string;
}
export interface UserRoleUpdatePayload {
  userId: string;
  role: string;
}

