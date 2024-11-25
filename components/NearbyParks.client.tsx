"use client";
import React, { useState, useEffect } from "react";
import Card from "./Card.client";
import { LocalParkType } from "@/types/parkTypes";
import useLocation from "@/hooks/useLocation";
import Banner from "./Banner.client";

const NearbyParks = () => {
  const { handleTrackLocation, isFindingLocation, longLat, locationErrorMsg } =
    useLocation();

  const [parks, setParks] = useState<LocalParkType[]>([]);

  const handleClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    async function parksByLocation() {
      if (longLat) {
        try {
          const limit = 6;
          const response = await fetch(
            `/api/local-parks?longLat=${longLat}&limit=${limit}`
          );
          const parks = await response.json();
          setParks(parks);
        } catch (error) {
          console.error(error);
        }
      }
    }

    parksByLocation();
  }, [longLat]);

  return (
    <div>
      <Banner
        handleOnClick={handleClick}
        buttonText={isFindingLocation ? "Locating..." : "View parks nearby"}
      />
      {locationErrorMsg && <p>Error: {locationErrorMsg}</p>}

      {parks.length > 0 && (
        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Stores near me
          </h2>
          <div className="card-container">
            {parks.map((park: LocalParkType) => (
              <Card
                key={`${park.id}`}
                name={park.name}
                imgUrl={park.imgUrl}
                href={`/parks/${park.id}`}
                parkId={park.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyParks;
