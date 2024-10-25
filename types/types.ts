export type ImageType = {
  credit: string;
  title: string;
  altText: string;
  caption: string;
  url: string;
};

export type NPSParkType = {
  fullName: string;
  description: string;
  images: ImageType[];
  latLong: string;
  parkCode: string;
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
