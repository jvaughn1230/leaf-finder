"use client";
import React from "react";

const Banner = () => {
  const handleClick = () => {};
  return (
    <div className="relative mb-12 grid lg:mb-24 lg-grid-cols-2">
      <div className="z-20 flex flex-col px-2 md:pt-12">
        <h1 className="my2 flex-wrap">
          <span className="pr-2 text-white">Leaf</span>
          <span className="text-gray-900">Finder</span>
        </h1>
        <p className="font-sans text-xl font-semibold text-gray-900 md:mt-6 lg:text-2xl">
          Find Parks Near you
        </p>
      </div>
      <div className="mt-12">
        <button onClick={handleClick}>Click Me</button>
      </div>
    </div>
  );
};

export default Banner;
