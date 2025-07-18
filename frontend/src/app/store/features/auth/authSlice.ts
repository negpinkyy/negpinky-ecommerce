import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/auth";


interface AuthState {
  user: User | null;
 
}

// Load user from localStorage
const loadUserFromLocalStorage = (): AuthState => {
  try {
    const serializedState = localStorage.getItem("user");
    if (serializedState === null) return { user: null };
    return { user: JSON.parse(serializedState) as User };
  } catch  {
    return {  user: null};
  }
};

const initialState: AuthState = loadUserFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
