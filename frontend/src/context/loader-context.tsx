// src/contexts/LoaderContext.tsx

import React, { createContext, useContext, useState } from "react";
import { HashLoader } from "react-spinners";

interface LoaderContextProps {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const LoaderContext = createContext<LoaderContextProps | undefined>(undefined);

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <div
          className="fixed inset-0 bg-white/10 backdrop-blur-md border  border-white/20  flex justify-center items-center z-50  rounded-lg">
          <HashLoader color="#fff" />
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within LoaderProvider");
  }
  return context;
};
