import React from "react";
import Link from "next/link";
import { fetchLocalPark } from "@/lib/localParks";
import Image from "next/image";
import AddToFavorites from "@/components/AddToFavorites";

async function getParkData(id: string) {
  return await fetchLocalPark(id);
}

export default async function Page(props: { params: { id: string } }) {
  const {
    params: { id },
  } = props;

  const park = await getParkData(id);
  if (!park) {
    throw new Error("Park not found");
  }
  const { name, address } = park;
  const imgUrl =
    "https://images.unsplash.com/photo-1564409972016-2825589beaed?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="page">
      <div className="mb-2 mt-24 text-lg font-bold">
        <Link href="/"> &larr; Back to Home</Link>
      </div>
      <div>
        <h1 className="sub-header">{name}</h1>
      </div>

      <div className="m-auto flex flex-col max-w-full px-12 py-12lg:max-w-6xl lg:flex-row gap-4  lg:h-auto">
        <div className="flex-1 h-full ">
          <Image
            src={imgUrl}
            alt={name}
            width={740}
            height={360}
            className="max-h-[420px] min-w-full max-w-full rounded-lg border-2 lg:max-w-[470px] "
          />
        </div>

        <div className="glass flex-1 flex-col rounded-lg p-4 lg:h-auto ">
          {address && (
            <div className="mb-4 flex">
              <Image
                src="/static/icons/places.svg"
                width="24"
                height="24"
                alt="places icon"
              />
              <p className="pl-2">{address}</p>
              <AddToFavorites parkId={id} type="local" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
