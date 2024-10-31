import React from "react";

//Container for the cards with a grid layout for reuse across the app

const CardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
      {children}
    </div>
  );
};

export default CardContainer;
