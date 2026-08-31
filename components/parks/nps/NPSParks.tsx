"use client";

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../Card.client";
import { TransformedNPSParkType } from "@/types/parkTypes";

const PAGE_SIZE = 9;

type NPSParksProps = {
  state: string;
  initialParks: TransformedNPSParkType[];
};

const NPSParks = ({ state, initialParks }: NPSParksProps) => {
  const [parks, setParks] = useState<TransformedNPSParkType[]>(initialParks);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialParks.length >= PAGE_SIZE);

  useEffect(() => {
    setParks(initialParks);
    setPage(1);
    setHasMore(initialParks.length >= PAGE_SIZE);
  }, [initialParks, state]);

  useEffect(() => {
    async function fetchMoreNPSParks() {
      if (page === 1) return;

      try {
        const response = await fetch(
          `/api/getNPSByState?state=${state}&limit=${PAGE_SIZE}&page=${page}`
        );
        const parksData = await response.json();

        if (!Array.isArray(parksData) || parksData.length < PAGE_SIZE) {
          setHasMore(false);
        }

        if (Array.isArray(parksData) && parksData.length > 0) {
          setParks((prev) => [...prev, ...parksData]);
        }
      } catch (error) {
        console.error(error);
        setHasMore(false);
      }
    }

    fetchMoreNPSParks();
  }, [page, state]);

  const fetchMoreParks = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={parks.length}
        next={fetchMoreParks}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={null}
        className="scrollbar-hide"
      >
        <div className="cards-container">
          {parks.map((park) => (
            <Card
              key={park.parkCode}
              name={park.fullName}
              imgUrl={park.images[0]?.url ?? ""}
              href={`/nps/park/${park.parkCode}`}
              parkId={park.parkCode}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default NPSParks;
