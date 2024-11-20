import React from "react";
import { stateArray } from "@/lib/states";
import { fetchNPSByState } from "@/lib/fetchNpsByState";
import NPSPark from "@/components/NPSPark";

type parksPageProps = {
  params: { state: string; parkCode: string };
};

export async function generateStaticParams() {
  const states = stateArray.map((state) => ({
    state: state.abbreviation.toLowerCase(),
  }));

  let allParams: { state: string; parkCode: string }[] = [];

  for (const state of states) {
    const parks = await fetchNPSByState(state.state);
    const stateParams = parks.map((park: { parkCode: string }) => ({
      state: state.state.toLowerCase(),
      parkCode: park.parkCode,
    }));

    allParams = allParams.concat(stateParams);
  }

  return allParams;
}

const NPSParkPage = ({ params }: parksPageProps) => {
  return (
    <div>
      <NPSPark parkCode={params.parkCode} />
    </div>
  );
};

export default NPSParkPage;
