import { MapboxType } from "@/types/types";

const transformLocalParkData = (
  idx: number,
  result: MapboxType,
  photos: string[]
) => {
  return {
    id: result.id,
    name: result.text,
    address: result.properties.address,
    imgUrl: photos.length > 0 ? photos[idx] : "",
  };
};

export const fetchLocalParks = async () => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/park%20leisure.json?limit=6&proximity=-115.139832%2C36.169941&access_token=${process.env.MAPBOX_API_KEY}`
    );
    const data = await response.json();
    const photos = await getListOfParkPhotos();
    const parks = data.features.map((result: MapboxType, idx: number) => {
      return transformLocalParkData(idx, result, photos);
    });
    return parks;
  } catch (error) {
    console.error("Error fetching local parks: ", error);
  }
};

export const fetchLocalPark = async (id: string) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${id}.json?limit=1&proximity=ip&access_token=${process.env.MAPBOX_API_KEY}`
    );
    const data = await response.json();
    const photos = await getListOfParkPhotos();
    const transformedData = data.features.map(
      (result: MapboxType, idx: number) => {
        return transformLocalParkData(idx, result, photos);
      }
    );
    return transformedData;
  } catch (error) {
    console.error("Error fetching park: ", error);
  }
};

const getListOfParkPhotos = async () => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query="park"&page=1&perPage=10&content_filter=high&orientation=landscape`
    );
    const photos = await response.json();
    const results = photos?.results || [];
    return results?.map((result: { urls: string[] }) => result.urls["small"]);
  } catch (error) {
    console.error("Error retrieving a photo", error);
  }
};
