import { MapboxType } from "@/types/types";

const transformLocalParkData = (
  idx: number,
  result: MapboxType,
  photos: string[]
) => {
  return {
    id: result.properties.mapbox_id,
    name: result.properties.name,
    address: result.properties.full_address,
    imgUrl: photos.length > 0 ? photos[idx] : "",
  };
};

export const fetchLocalParks = async (longLat: string, limit: number) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/forward?q=park&poi_category=park,outdoors&proximity=${longLat}&limit=6&access_token=${process.env.MAPBOX_API_KEY}`
    );

    const data = await response.json();
    const photos = await getListOfParkPhotos();
    const parks = data?.features.map((result: MapboxType, idx: number) => {
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
      `https://api.mapbox.com/search/searchbox/v1/retrieve/${id}?session_token=1&access_token=${process.env.MAPBOX_API_KEY}`
    );
    const data = await response.json();
    const photos = await getListOfParkPhotos();

    const transformedData = transformLocalParkData(0, data.features[0], photos);

    return transformedData;
  } catch (error) {
    console.error("Error fetching park: ", error);
  }
};

const getListOfParkPhotos = async () => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query="green park"&page=1&perPage=10&content_filter=high&orientation=landscape`
    );
    const photos = await response.json();
    const results = photos?.results || [];
    return results?.map(
      (result: { urls: { small: string[] } }) => result.urls["small"]
    );
  } catch (error) {
    console.error("Error retrieving a photo", error);
  }
};
