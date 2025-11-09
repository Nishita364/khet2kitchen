
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { FarmDetailsData } from '@/components/dashboard/farm-details';

interface FarmDetailsContextType {
  farmDetails: FarmDetailsData;
  setFarmDetails: (details: FarmDetailsData) => void;
  resetFarmDetails: () => FarmDetailsData;
}

const FarmDetailsContext = createContext<FarmDetailsContextType | undefined>(undefined);

export const useFarmDetails = () => {
  const context = useContext(FarmDetailsContext);
  if (context === undefined) {
    throw new Error('useFarmDetails must be used within a FarmDetailsProvider');
  }
  return context;
};

const initialFarmDetails: FarmDetailsData = {
    irrigationType: "drip",
    soilType: "loam",
    currentCrop: "Winter Wheat",
    acreage: 10,
    sowingDate: new Date("2023-10-15T00:00:00"),
    harvestDate: new Date("2024-06-20T00:00:00"),
    expectedYield: 8000,
    lastSownCrop: "Soybeans",
    lastYield: 7500,
};

const emptyFarmDetails: FarmDetailsData = {
    irrigationType: "",
    soilType: "",
    currentCrop: "",
    acreage: 0,
    sowingDate: new Date(),
    harvestDate: new Date(),
    expectedYield: 0,
    lastSownCrop: "",
    lastYield: 0,
};


export const FarmDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [farmDetails, setFarmDetails] = useState<FarmDetailsData>(() => ({
    ...initialFarmDetails,
    sowingDate: isClient ? new Date("2023-10-15T00:00:00") : initialFarmDetails.sowingDate,
    harvestDate: isClient ? new Date("2024-06-20T00:00:00") : initialFarmDetails.harvestDate
  }));
  
  const resetFarmDetails = () => {
    const newEmptyDetails = {
      ...emptyFarmDetails,
      sowingDate: isClient ? new Date() : emptyFarmDetails.sowingDate,
      harvestDate: isClient ? new Date() : emptyFarmDetails.harvestDate
    };
    setFarmDetails(newEmptyDetails);
    return newEmptyDetails;
  }
  
  const value = {
    farmDetails,
    setFarmDetails,
    resetFarmDetails,
  };

  return (
    <FarmDetailsContext.Provider value={value}>
      {children}
    </FarmDetailsContext.Provider>
  );
};
