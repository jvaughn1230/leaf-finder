"use client";
import React, { useState, useEffect } from "react";
import { LocalParkType, NPSParkType } from "@/types/parkTypes";
import Card from "./Card.client";

type Props = { type: string };

const FavoriteParks: React.FC<Props> = ({ type }) => {
  const [parks, setParks] = useState<(LocalParkType | NPSParkType)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavoriteParks = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/favorites?type=${type}`);
        const data = await response.json();

        if (response.ok) {
          setParks(data);
        } else {
          setError(data.error || `Failed to fetch favorite ${type} parks.`);
        }
      } catch (err) {
        console.error(err);
        setError(`An error occurred while fetching ${type} parks.`);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteParks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)
    return <p className="text-red-500">There was an error. Please try again</p>;

  {
  }
  return (
    <div>
      {parks?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {parks.map((park) =>
            type === "local" ? (
              <Card
                key={(park as LocalParkType).id}
                parkId={(park as LocalParkType).id}
                name={(park as LocalParkType).name}
                imgUrl={(park as LocalParkType).imgUrl}
                href={`/parks/${(park as LocalParkType).id}`}
              />
            ) : (
              <Card
                key={(park as NPSParkType).parkCode}
                parkId={(park as NPSParkType).parkCode}
                name={(park as NPSParkType).fullName}
                imgUrl={(park as NPSParkType).images[0]?.url}
                href={`/nps/${(park as NPSParkType).parkCode}`}
              />
            )
          )}
        </div>
      ) : (
        <p>No {type === "local" ? "local" : "NPS"} parks favorited yet.</p>
      )}
    </div>
  );
};

export default FavoriteParks;
