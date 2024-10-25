"use client";
import React, { useEffect, useState } from "react";
import { NPSParkType } from "@/types/types";

const NPSPark = ({ parkCode }: { parkCode: string }) => {
  const [park, setPark] = useState<NPSParkType>();

  useEffect(() => {
    async function fetchNPSPark() {
      if (parkCode) {
        try {
          const response = await fetch(`/api/getNPSPark?parkCode=${parkCode}`);
          const parkData = await response.json();

          if (!parkData) {
            console.error("No park data found");
            return;
          }

          setPark(parkData);
        } catch (error) {
          console.error("Error fetching NPS park", error);
        }
      }
    }

    fetchNPSPark();
  }, [parkCode]);

  return (
    <div>
      <h2>{park?.fullName}</h2>
    </div>
  );
};

export default NPSPark;
