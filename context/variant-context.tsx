'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';

type Variant = 'LOGIN' | 'REGISTER';

type ContextType = {
  variant: Variant;
  toggleVariant: () => void;
};

const VariantContext = createContext<ContextType | undefined>(undefined);

const VariantProvider = ({ children }: { children: React.ReactNode }) => {
  const [variant, setVariant] = useState<Variant>('LOGIN');

  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) =>
      prevVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN'
    );
  }, []);

  const contextValue: ContextType = {
    variant,
    toggleVariant,
  };

  return (
    <VariantContext.Provider value={contextValue}>
      {children}
    </VariantContext.Provider>
  );
};

const useVariant = (): ContextType => {
  const context = useContext(VariantContext);
  if (!context) {
    throw new Error('useVariant must be used within a VariantProvider');
  }
  return context;
};

export { VariantProvider, useVariant };
