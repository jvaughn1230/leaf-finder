export type ImageType = {
  credit: string;
  title: string;
  altText: string;
  caption: string;
  url: string;
};

export type TransformedNPSParkType = {
  fullName: string;
  description: string;
  images: ImageType[];
  latLong: string;
  parkCode: string;
  designation: string;
  weatherInfo: string;
  directionsUrl: string;
  directionsInfo: string;
  url: string;
  email: string;
  phone: string;
  address: string;
};

export type NPSParkType = {
  fullName: string;
  description: string;
  images: ImageType[];
  latLong: string;
  parkCode: string;
  designation: string;
  weatherInfo: string;
  directions: string;
  contacts?: {
    phoneNumbers: { phoneNumber: string }[];
    emailAddresses: { emailAddress: string }[];
  };
  directionsUrl: string;
  directionsInfo: string;
  url: string;
  addresses: {
    city: string;
    stateCode: string;
  }[];
};

export type CardType = {
  name: string;
  imgUrl: string;
  href: string;
};

export type MapboxType = {
  id: string;
  text: string;
  properties: {
    address: string;
  };
};

export type LocalParkType = {
  id: string;
  name: string;
  address: string;
  imgUrl: string;
};

export type PositionType = {
  coords: { latitude: number; longitude: number };
};
