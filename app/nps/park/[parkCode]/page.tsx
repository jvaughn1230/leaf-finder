import { notFound } from "next/navigation";
import { stateArray } from "@/lib/states";
import { fetchNPSByState, fetchNPSPark } from "@/lib/NPSParks";
import NPSPark from "@/components/parks/nps/NPSPark";

type ParksPageProps = {
  params: { parkCode: string };
};

export async function generateStaticParams() {
  const states = stateArray.map((state) => ({
    state: state.abbreviation.toLowerCase(),
  }));

  let allParams: { parkCode: string }[] = [];

  for (const state of states) {
    const parks = await fetchNPSByState(state.state);
    const stateParams = parks.map((park) => ({
      parkCode: park.parkCode,
    }));

    allParams = allParams.concat(stateParams);
  }

  return allParams;
}

const NPSParkPage = async ({ params }: ParksPageProps) => {
  const park = await fetchNPSPark(params.parkCode);

  if (!park) {
    notFound();
  }

  return (
    <div>
      <NPSPark park={park} />
    </div>
  );
};

export default NPSParkPage;
