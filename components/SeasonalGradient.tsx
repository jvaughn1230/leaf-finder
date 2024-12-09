"use client";
import React from "react";
import { useSeason } from "@/app/context/SeasonContext";

const SeasonalGradient = ({ children }: { children: React.ReactNode }) => {
  const { season } = useSeason();

  return <div className={`${season}-gradient`}>{children}</div>;
};

export default SeasonalGradient;
