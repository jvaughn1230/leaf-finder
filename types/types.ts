export type ImageType = {
  credit: string;
  title: string;
  altText: string;
  caption: string;
  url: string;
};

export type ParkType = {
  id: string;
  fullName: string;
  description: string;
  images: ImageType[];
  latLong: string;
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
