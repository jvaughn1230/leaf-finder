// Adjust to name
// address is shared
//

export type NPSImageType = {
  credit: string;
  title: string;
  altText: string;
  caption: string;
  url: string;
};

export type TransformedNPSParkType = {
  fullName: string;
  description: string;
  images: NPSImageType[];
  latLong: string;
  parkCode: string;
  designation: string;
  weatherInfo: string;
  directionsUrl: string;
  directionsInfo: string;
  url: string;
  email: string;
  phone: string;
  address: string | string[];
};

type NPSAddressType = {
  postalCode: string;
  city: string;
  stateCode: string;
  countryCode: string;
  provinceTerritoryCode: string;
  line1: string;
  type: string;
  line3: string;
  line2: string;
};

export type NPSParkType = {
  fullName: string;
  description: string;
  images: NPSImageType[];
  latLong: string;
  parkCode: string;
  designation: string;
  weatherInfo: string;
  directions: string;
  addresses?: [NPSAddressType];
  contacts?: {
    phoneNumbers: { phoneNumber: string }[];
    emailAddresses: { emailAddress: string }[];
  };
  directionsUrl: string;
  directionsInfo: string;
  url: string;
};

export type LocalParkType = {
  id: string;
  name: string;
  address: string;
  imgUrl: string;
};
