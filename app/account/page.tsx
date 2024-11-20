"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/Card.client";
import { NPSParkType, LocalParkType } from "@/types/types";

const page: React.FC = () => {
  const [localParks, setLocalParks] = useState<any[]>([]);
  const [npsParks, setNpsParks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFavorites = async (type: "local" | "nps") => {
    try {
      const response = await fetch(`/api/favorites?type=${type}`);
      const data = await response.json();

      if (response.ok) {
        return data.favorites;
      } else {
        setError(data.error || "Failed to fetch favorites.");
        return [];
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching favorites.");
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [local, nps] = await Promise.all([
          fetchFavorites("local"),
          fetchFavorites("nps"),
        ]);
        setLocalParks(local);
        setNpsParks(nps);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch favorites.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading favorites...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
  return (
    <div>
      <div>
        <h2>Favorite Local Parks</h2>
        {localParks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {localParks.map((park: LocalParkType) => (
              <Card
                key={park.id}
                parkId={park.id}
                name={park.name}
                imgUrl={park.imgUrl}
                href={`/parks/${park.id}`}
              />
            ))}
          </div>
        ) : (
          <p>No local parks favorited yet.</p>
        )}
      </div>
      <div>
        <h2>Favorite NPS Parks</h2>
        {localParks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {npsParks.map((park: NPSParkType) => (
              <Card
                key={park.parkCode}
                parkId={park.parkCode}
                name={park.fullName}
                imgUrl={park.images[0].url}
                href={`/nps/${park.parkCode}`}
              />
            ))}
          </div>
        ) : (
          <p>No local parks favorited yet.</p>
        )}
      </div>
    </div>
  );
};

export default page;
