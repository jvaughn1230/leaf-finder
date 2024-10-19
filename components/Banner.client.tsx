"use client";
import React, { MouseEventHandler } from "react";
import LeafScene from "./LeafScene.client";

const Banner = ({
  handleOnClick,
  buttonText,
}: {
  handleOnClick: MouseEventHandler<HTMLButtonElement> | undefined;
  buttonText: string;
}) => {
  return (
    <div className="relative mb-12 grid lg:mb-24 lg-grid-cols-2 border-2 border-solid border-blue-500 w-full">
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
        <button onClick={handleOnClick}>{buttonText}</button>
      </div>
      <LeafScene />
    </div>
  );
};

export default Banner;
