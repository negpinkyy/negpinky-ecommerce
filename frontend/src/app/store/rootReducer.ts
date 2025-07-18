// Root
import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import authApi from "./features/auth/authapi";
import authReducer from "./features/auth/authSlice";



const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  //  auth: authReducer,
   cart: cartReducer,
   auth:authReducer,
}
);

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
