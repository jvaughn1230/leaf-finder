"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type SeasonContextType = {
  season: string;
  setSeason: (newSeason: string) => void;
};

const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

export const SeasonProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [season, setSeason] = useState<string>("");

  useEffect(() => {
    const savedSeason = localStorage.getItem("preferredSeason");
    if (savedSeason) {
      setSeason(savedSeason);
    } else {
      const defaultSeason = getCurrentSeason();
      setSeason(defaultSeason);
    }
  }, []);

  const updateSeason = (newSeason: string) => {
    setSeason(newSeason);
    localStorage.setItem("preferredSeason", newSeason);
  };

  return (
    <SeasonContext.Provider value={{ season, setSeason: updateSeason }}>
      {children}
    </SeasonContext.Provider>
  );
};

export const useSeason = () => {
  const context = useContext(SeasonContext);
  if (!context) {
    throw new Error("useSeason must be used within a SeasonProvider");
  }
  return context;
};

function getCurrentSeason(): string {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) {
    return "spring";
  } else if (month >= 5 && month <= 7) {
    return "summer";
  } else if (month >= 8 && month <= 10) {
    return "fall";
  } else {
    return "winter";
  }
}
