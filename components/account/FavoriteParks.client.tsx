"use client";
import React, { useState, useEffect } from "react";
import { LocalParkType, NPSParkType } from "@/types/parkTypes";
import Card from "../parks/Card.client";

type Props = { type: string };

/**
 * FavoriteParks Component
 *
 * Displays a list of favorited parks, either local or NPS (National Park Service) parks.
 * Fetches data from the `/api/favorites` endpoint and renders a grid of `Card` components.
 *
 * @param {Object} props - Component props.
 * @param {string} props.type - The type of parks to fetch (`local` or `nps`).
 * @returns {JSX.Element} - A grid of favorited parks or a message if no parks are favorited.
 */

const FavoriteParks: React.FC<Props> = ({ type }) => {
  const [parks, setParks] = useState<(LocalParkType | NPSParkType)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /**
   * Fetches favorited parks from the API based on the `type` prop.
   * Updates the `parks` state with the fetched data or sets an error state if the fetch fails.
   */
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
        console.error("Fetch error:", err);
        setError(`An error occurred while fetching ${type} parks.`);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteParks();
  }, []);

  // Display loading state
  if (loading) return <p>Loading...</p>;

  // Display error state
  if (error)
    return <p className="text-red-500">There was an error. Please try again</p>;

  return (
    <div>
      {parks?.length > 0 ? (
        <div className="cards-container">
          {parks.map((park) => {
            const isLocalPark = type === "local";
            if (isLocalPark) {
              const localPark = park as LocalParkType;
              return (
                <Card
                  key={localPark.id}
                  parkId={localPark.id}
                  name={localPark.name}
                  imgUrl={localPark.imgUrl}
                  href={`/parks/${localPark.id}`}
                />
              );
            } else {
              const npsPark = park as NPSParkType;
              return (
                <Card
                  key={npsPark.parkCode}
                  parkId={npsPark.parkCode}
                  name={npsPark.fullName}
                  imgUrl={npsPark.images[0]?.url}
                  href={`/nps/${npsPark.parkCode}`}
                />
              );
            }
          })}
        </div>
      ) : (
        <p>No {type === "local" ? "local" : "NPS"} parks favorited yet.</p>
      )}
    </div>
  );
};

export default FavoriteParks;
