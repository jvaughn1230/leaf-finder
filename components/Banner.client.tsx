"use client";
import React, { MouseEventHandler } from "react";
import LeafScene from "./LeafScene.client";

// Banner component for the home page

const Banner = ({
  handleOnClick,
  buttonText,
}: {
  handleOnClick: MouseEventHandler<HTMLButtonElement> | undefined;
  buttonText: string;
}) => {
  return (
    <div className="relative mb-12 grid lg:mb-24 lg-grid-cols-2  w-full  rounded-xl  shadow-xl">
      <div className="z-20 flex flex-col px-2 md:pt-12">
        <h1 className="my2 flex-wrap home-header">
          <span className="pr-2 text-white">Leaf</span>
          <span className="text-gray-900">Finder</span>
        </h1>
        <p className="font-sans text-gray-900 md:mt-6 sub-header">
          Find Parks Near you
        </p>
      </div>
      <div className="mt-12">
        <button onClick={handleOnClick}>{buttonText}</button>
      </div>
      <LeafScene />
    </div>
  );
};

export default Banner;
