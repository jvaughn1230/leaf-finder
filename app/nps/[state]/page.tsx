import React from "react";
import { stateArray } from "@/lib/states";
import NPSParks from "@/components/NPSParks";

type StateParksPageProps = {
  params: { state: string };
};

export async function generateStaticParams() {
  const params = stateArray.map((state) => ({
    state: state.abbreviation.toLowerCase(),
  }));
  return params;
}

async function NPSStatePage({ params }: StateParksPageProps) {
  const stateInfo = stateArray.find(
    (state) => state.abbreviation.toLowerCase() === params.state
  );
  const stateName = stateInfo ? stateInfo.name : "Unknown State";

  return (
    <div className="page">
      <h1 className="my-16 page-header">{stateName} National Parks</h1>
      <NPSParks state={params.state} />
    </div>
  );
}

export default NPSStatePage;
