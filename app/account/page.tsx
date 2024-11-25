import React from "react";
import FavoriteParks from "@/components/FavoriteParks.client";

const page: React.FC = () => {
  return (
    <div className="page">
      <div>
        <h2 className="sub-header">Favorite Local Parks</h2>
        <FavoriteParks type="local" />
      </div>
      <div>
        <h2 className="sub-header">Favorite NPS Parks</h2>
        <FavoriteParks type="nps" />
      </div>
    </div>
  );
};

export default page;
