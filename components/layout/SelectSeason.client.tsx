"use client";

import { useSeason } from "@/app/context/SeasonContext";

const SelectSeason: React.FC = () => {
  const { season, setSeason } = useSeason();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(event.target.value);
  };

  return (
    <div className="flex mr-6">
      <label
        htmlFor="season"
        className="text-black hover:opacity-50 text-lg mr-2"
      >
        Season:
      </label>
      <select
        id="season"
        value={season}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
      >
        <option value="spring">Spring</option>
        <option value="summer">Summer</option>
        <option value="fall">Fall</option>
        <option value="winter">Winter</option>
      </select>
    </div>
  );
};

export default SelectSeason;
