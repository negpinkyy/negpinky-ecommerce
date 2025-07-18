
import type { store } from "./store";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof import("./rootReducer").default>;
