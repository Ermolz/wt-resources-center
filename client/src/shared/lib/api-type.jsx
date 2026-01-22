import { createContext, useContext, useEffect, useState } from 'react';

const ApiTypeContext = createContext(null);

const getInitialApiType = () => {
  if (typeof window !== 'undefined') {
    const savedType = localStorage.getItem('apiType');
    return savedType || 'rest';
  }
  return 'rest';
};

export const ApiTypeProvider = ({ children }) => {
  const [apiType, setApiType] = useState(() => getInitialApiType());

  useEffect(() => {
    localStorage.setItem('apiType', apiType);
  }, [apiType]);

  const changeApiType = (type) => {
    if (type === 'rest' || type === 'graphql') {
      setApiType(type);
    }
  };

  return (
    <ApiTypeContext.Provider value={{ apiType, changeApiType }}>
      {children}
    </ApiTypeContext.Provider>
  );
};

export const useApiType = () => {
  const context = useContext(ApiTypeContext);
  if (!context) {
    throw new Error('useApiType must be used within ApiTypeProvider');
  }
  return context;
};

