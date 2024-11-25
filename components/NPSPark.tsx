"use client";
import React, { useEffect, useState } from "react";
import { TransformedNPSParkType } from "@/types/parkTypes";
import NPSParkDetailsCard from "./NPSParkDetailsCard";
import EmblaCarousel from "@/components/carousel/EmblaCarousel";
import AddToFavorites from "./AddToFavorites";

const NPSPark = ({ parkCode }: { parkCode: string }) => {
  const [park, setPark] = useState<TransformedNPSParkType>();

  useEffect(() => {
    async function fetchNPSPark() {
      if (parkCode) {
        try {
          const response = await fetch(`/api/getNPSPark?parkCode=${parkCode}`);
          const parkData = await response.json();

          if (!parkData) {
            console.error("No park data found");
            return;
          }

          setPark(parkData);
        } catch (error) {
          console.error("Error fetching NPS park", error);
        }
      }
    }

    fetchNPSPark();
  }, [parkCode]);

  const parkDetails = [
    {
      name: "LOCATION",
      data: park?.address,
      isButton: false,
    },
    {
      name: "EMAIL",
      data: park?.email,
      isButton: false,
    },
    {
      name: "PHONE",
      data: park?.phone,
      isButton: false,
    },
    {
      name: "Learn More",
      data: park?.url,
      isButton: true,
    },
  ];

  return (
    <div>
      {/* header image */}
      <div
        className={`flex flex-col gap-4 items-center justify-center h-[80vh]  bg-cover bg-center `}
        style={{
          backgroundImage: `url(${park?.images[0].url})`,
        }}
      >
        <h2 className="page-header text-white">{park?.fullName}</h2>
        <h3 className="sub-header text-white">{park?.designation}</h3>
        <AddToFavorites type="nps" parkId={parkCode} />
      </div>

      {/* Park Info */}
      <div className="bg-white font-normal text-base mx-auto max-w-[1300px] px-4 text-left border-2px solid yellow">
        <div className="mt-[-48px] p-8 relative w-full">
          <div className="flex flex-wrap mx-[-15]">
            {parkDetails.map((detail, index) => (
              <NPSParkDetailsCard
                key={index}
                name={detail.name}
                data={detail.data || ""}
                isButton={detail.isButton}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Park Summary */}
      <div className="np-park-content py-12 px-8">
        <div className=" mx-auto space-y-12 max-w-6xl">
          <div className="flex flex-col lg:flex-row mb-5">
            <div className="lg:w-1/4 lg:pr-4 ">
              <h1 className="  relative  text-4xl font-bold   text-green-800 before:ml-[-4rem] before:mt-5 before:w-[60px] before:absolute before:h-[2px] before:bg-white  before:left-[-1rem]">
                Overview
              </h1>
            </div>
            <div className="lg:w-3/4">
              <p className="text-white font-bold">{park?.description}</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/4 lg:pr-4">
              <h1 className="relative text-4xl font-bold text-green-800 before:ml-[-4rem] before:mt-5 before:w-[60px] before:absolute before:h-[2px] before:bg-white  before:left-[-1rem]">
                Climate
              </h1>
            </div>
            <div className="lg:w-3/4">
              <p className="text-white font-bold">{park?.weatherInfo}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="py-8 px-8">
        <EmblaCarousel images={park?.images ?? []} />
      </div>
    </div>
  );
};

export default NPSPark;
