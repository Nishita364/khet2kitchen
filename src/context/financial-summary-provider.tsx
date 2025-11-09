
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { FinancialSummaryData } from '@/components/dashboard/financial-summary';

interface FinancialSummaryContextType {
  financialSummary: FinancialSummaryData;
  setFinancialSummary: (details: FinancialSummaryData) => void;
  resetFinancialSummary: () => FinancialSummaryData;
}

const FinancialSummaryContext = createContext<FinancialSummaryContextType | undefined>(undefined);

export const useFinancialSummary = () => {
  const context = useContext(FinancialSummaryContext);
  if (context === undefined) {
    throw new Error('useFinancialSummary must be used within a FinancialSummaryProvider');
  }
  return context;
};

const initialFinancialSummary: FinancialSummaryData = {
    crop: "Winter Wheat",
    seeds: 500,
    fertilizer: 1500,
    pesticides: 300,
    labor: 2000,
    other: 200,
    totalYield: 8000,
    pricePerKg: 0.25,
    loanInterest: 100
};

const emptyFinancialSummary: FinancialSummaryData = {
    crop: "",
    seeds: 0,
    fertilizer: 0,
    pesticides: 0,
    labor: 0,
    other: 0,
    totalYield: 0,
    pricePerKg: 0,
    loanInterest: 0
};

export const FinancialSummaryProvider = ({ children }: { children: ReactNode }) => {
  const [financialSummary, setFinancialSummary] = useState<FinancialSummaryData>(initialFinancialSummary);

  const resetFinancialSummary = () => {
    setFinancialSummary(emptyFinancialSummary);
    return emptyFinancialSummary;
  }

  const value = {
    financialSummary,
    setFinancialSummary,
    resetFinancialSummary
  };

  return (
    <FinancialSummaryContext.Provider value={value}>
      {children}
    </FinancialSummaryContext.Provider>
  );
};
