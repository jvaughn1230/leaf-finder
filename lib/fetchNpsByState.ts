import { NPSParkType } from "@/types/types";

const transformParkData = (park: NPSParkType) => {
  return {
    id: park.id,
    fullName: park.fullName,
    description: park.description,
    images: park.images,
    longLat: park.longLat,
  };
};

export const fetchNPSByState = async (
  state: string,
  limit: number,
  start: number
) => {
  try {
    const response = await fetch(
      `https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=${limit}&start=${start}&api_key=${process.env.NPS_API_KEY}`
    );
    const { data } = await response.json();

    return data.map((park: NPSParkType) => {
      return transformParkData(park);
    });
  } catch (error) {
    console.error("Error while fetching parks: ", error);
  }
};
