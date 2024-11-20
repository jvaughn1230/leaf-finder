import React, { useEffect, useState } from "react";
import { LocalParkType, NPSParkType } from "@/types/types";

type FavoriteParksProps = {
  type: "nps" | "local";
};

const FavoriteParks: React.FC<FavoriteParksProps> = ({ type }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const ParkType = type === "nps" ? NPSParkType : LocalParkType;

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/favorites?type=${type}`);
        const data = await response.json();

        if (data.success) {
          setFavorites(data.data);
        } else {
          setError("Failed to fetch favorites");
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [type]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div>
        <h2>
          {type === "nps" ? "NPS Park Favorites" : "Local Park Favorites"}
        </h2>
        <ul>
          {favorites.length > 0 ? (
            favorites.map((park) => (
              <li key={park._id}>
                <h3>{park.name}</h3>
              </li>
            ))
          ) : (
            <p>No favorites added yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FavoriteParks;
