"use client";

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";
import { store, persistor } from "./store/store";
import {LoaderProvider} from "../context/loader-context";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <LoaderProvider>
            {children}
          </LoaderProvider>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}
