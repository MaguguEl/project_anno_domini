import React, { createContext, useContext, ReactNode } from 'react';
import { useDataManager, UseDataManagerReturn } from '../hooks/useDataManager';

const DataContext = createContext<UseDataManagerReturn | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const dataManager = useDataManager();
  
  return (
    <DataContext.Provider value={dataManager}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): UseDataManagerReturn => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};