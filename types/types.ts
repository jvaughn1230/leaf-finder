export type CardType = {
  parkId: string;
  name: string;
  imgUrl: string;
  href: string;
};

export type MapboxType = {
  properties: {
    mapbox_id: string;
    name: string;
    full_address: string;
  };
};

export type PositionType = {
  coords: { latitude: number; longitude: number };
};
