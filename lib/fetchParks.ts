import { ParkType } from "@/types/types";
const stateCode = "ca";

const transformParkData = (park: ParkType) => {
  return {
    id: park.id,
    fullName: park.fullName,
    description: park.description,
    images: park.images,
    latLong: park.latLong,
  };
};

export const fetchParks = async () => {
  try {
    const response = await fetch(
      `https://developer.nps.gov/api/v1/parks?stateCode=${stateCode}&api_key=${process.env.NPS_API_KEY}`
    );
    const { data } = await response.json();

    return data.map((park: ParkType) => {
      return transformParkData(park);
    });
  } catch (error) {
    console.error("Error while fetching parks: ", error);
  }
};
