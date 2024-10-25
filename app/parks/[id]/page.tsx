import React from "react";
import Link from "next/link";
import { fetchLocalPark } from "@/lib/fetchLocalParks";
import Image from "next/image";
// import { LocalParkType } from "@/types/types";

async function getParkData(id: string) {
  return await fetchLocalPark(id);
}

export default async function Page(props: { params: { id: string } }) {
  const {
    params: { id },
  } = props;

  const park = await getParkData(id);
  const { name, address } = park[0];
  const imgUrl =
    "https://images.unsplash.com/photo-1564409972016-2825589beaed?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="h-full pb-80">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div>
          <div className="mb-2 mt-24 text-lg font-bold">
            <Link href="/"> &larr; Back to Home</Link>
          </div>
          <div className="my-4">
            <h1 className="text-4xl">{name}</h1>
          </div>
          <Image
            src={imgUrl}
            alt={name}
            width={740}
            height={360}
            className="max-h-[420px] min-w-full max-w-full rounded-lg border-2 lg:max-w-[470px]"
          />
        </div>

        <div className="glass mt-12 flex-col rounded-lg p-4 lg:mt-48">
          {address && (
            <div className="mb-4 flex">
              <Image
                src="/static/icons/places.svg"
                width="24"
                height="24"
                alt="places icon"
              />
              <p className="pl-2">{address}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
