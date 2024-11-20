"use client";

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "@/components/Card.client";
import { NPSParkType } from "@/types/types";

const NPSParks = ({ state }: { state: string }) => {
  const [parks, setParks] = useState<NPSParkType[]>([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    async function fetchNPSParks() {
      if (state) {
        try {
          const response = await fetch(
            `/api/getNPSByState?state=${state}&limit=9&page=${page}`
          );
          const parksData = await response.json();

          if (parksData.length < 9) {
            setHasMore(false);
          }

          setParks((prev) => [...prev, ...parksData]);
          setInitialLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchNPSParks();
  }, [page, state]);

  const fetchMoreParks = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <div>
      {initialLoading ? (
        <h4>Loading...</h4>
      ) : (
        <InfiniteScroll
          dataLength={parks.length}
          next={fetchMoreParks}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more parks to show</p>}
          className="scrollbar-hide"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
            {parks.map((park) => (
              <Card
                key={park.parkCode}
                name={park.fullName}
                imgUrl={park.images[0].url}
                href={`/nps/${state}/${park.parkCode}`}
                parkId={park.parkCode}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default NPSParks;
