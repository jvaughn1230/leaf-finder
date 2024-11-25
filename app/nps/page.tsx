import React from "react";
import SelectState from "@/components/SelectState";

const Page = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-npsBg bg-cover">
      <div>
        <h1>Explore National Parks Near You</h1>
        <div className="flex justify-center mt-4">
          <SelectState />
        </div>
      </div>
    </div>
  );
};

export default Page;
