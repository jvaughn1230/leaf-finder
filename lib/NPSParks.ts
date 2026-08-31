import { NPSParkType, TransformedNPSParkType } from "@/types/parkTypes";

const NPS_REVALIDATE_SECONDS = 60 * 60 * 24; // 24 hours

const transformParkData = (park: NPSParkType): TransformedNPSParkType => {
  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  };

  const physicalAddress = park.addresses?.find(
    (address) => address.type === "Physical"
  );

  return {
    fullName: park.fullName,
    description: park.description,
    images: park.images,
    latLong: park.latLong,
    parkCode: park.parkCode,
    designation: park.designation,
    weatherInfo: park.weatherInfo,
    email: park.contacts?.emailAddresses[0]?.emailAddress ?? "",
    phone: park.contacts?.phoneNumbers[0]?.phoneNumber
      ? formatPhoneNumber(park.contacts.phoneNumbers[0].phoneNumber)
      : "",
    directionsUrl: park.directionsUrl,
    directionsInfo: park.directionsInfo,
    url: park.url,
    address: physicalAddress
      ? [
          physicalAddress.line1,
          physicalAddress.line2,
          physicalAddress.line3,
          `${physicalAddress.city}, ${physicalAddress.stateCode} ${physicalAddress.postalCode}`,
        ].filter(Boolean)
      : ["No physical address available"],
  };
};

export const fetchNPSByState = async (
  state: string,
  limit = 9,
  start = 0
): Promise<TransformedNPSParkType[]> => {
  try {
    const response = await fetch(
      `https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=${limit}&start=${start}&api_key=${process.env.NPS_API_KEY}`,
      { next: { revalidate: NPS_REVALIDATE_SECONDS } }
    );
    const { data } = await response.json();

    return (data ?? []).map((park: NPSParkType) => {
      return transformParkData(park);
    });
  } catch (error) {
    console.error("Error while fetching parks: ", error);
    return [];
  }
};

export const fetchNPSPark = async (
  parkCode: string
): Promise<TransformedNPSParkType | null> => {
  try {
    const response = await fetch(
      `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=${process.env.NPS_API_KEY}`,
      { next: { revalidate: NPS_REVALIDATE_SECONDS } }
    );

    const { data } = await response.json();

    if (!data?.[0]) return null;

    return transformParkData(data[0]);
  } catch (error) {
    console.error("Error while fetching park: ", error);
    return null;
  }
};
