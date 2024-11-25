"use client";
import React from "react";
import { stateArray } from "../lib/states";
import { useRouter } from "next/navigation";

type StateType = {
  name: string;
  abbreviation: string;
};

const SelectState = () => {
  const router = useRouter();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = event.target.value;
    if (selectedState) {
      router.push(`${selectedState.toLowerCase()}`);
    }
  };

  const stateSelect = (state: StateType) => (
    <option value={`/nps/${state.abbreviation}`} key={state.abbreviation}>
      {state.name}
    </option>
  );

  return (
    <select
      onChange={handleSelectChange}
      defaultValue=""
      className="w-96 py-2 px-3"
    >
      <option value="">--Select State--</option>
      {stateArray.map(stateSelect)}
    </select>
  );
};

export default SelectState;
