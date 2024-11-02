/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for your context value
interface ServiceContextType {
  serviceId: string | null;
  setServiceId: (id: string | null) => void;
}

// Create the context with a default value of `undefined`
const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

// Define a provider component
interface ServiceProviderProps {
  children: ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({
  children,
}) => {
  const [serviceId, setServiceId] = useState<string | null>(null);

  return (
    <ServiceContext.Provider value={{ serviceId, setServiceId }}>
      {children}
    </ServiceContext.Provider>
  );
};

// Custom hook to use the ServiceContext
export const useService = (): ServiceContextType => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useService must be used within a ServiceProvider");
  }
  return context;
};
