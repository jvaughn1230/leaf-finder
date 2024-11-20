"use client";
import React, { useState } from "react";

type Props = { type: string; parkId: string };

const AddToFavorites = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { type, parkId } = props;

  const addToFavorites = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, park: parkId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add to favorites");
      }

      setSuccess("Park added to favorites!");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to add to favorites"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={addToFavorites} disabled={isLoading}>
        {isLoading ? "Adding..." : "Add to Favorites"}
      </button>
      {success && <p className="text-green-500 mt-2">{success}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default AddToFavorites;
