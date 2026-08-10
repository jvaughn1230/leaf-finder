import { NPSParkType } from "@/types/parkTypes";

const transformParkData = (park: NPSParkType) => {
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
    direcionsUrl: park.directionsUrl,
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

export const fetchNPSByState = async (state: string, limit = 9, start = 0) => {
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

export const fetchNPSPark = async (parkCode: string) => {
  try {
    const response = await fetch(
      `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=${process.env.NPS_API_KEY}`
    );

    const { data } = await response.json();

    return transformParkData(data[0]);
  } catch (error) {
    console.error("Error while fetching park: ", error);
  }
};
