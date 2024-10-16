import Banner from "@/components/Banner.client";
import Card from "@/components/Card.client";
import { fetchLocalParks } from "@/lib/fetchLocalParks";
import { LocalParkType } from "@/types/types";

export default async function Home() {
  const localParks = await fetchLocalParks();

  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <Banner />
        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">Parks</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
            {localParks.map((park: LocalParkType) => {
              const { name, id, imgUrl } = park;
              return (
                <Card
                  key={id}
                  name={name}
                  href={`/parks/${id}`}
                  imgUrl={imgUrl}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
