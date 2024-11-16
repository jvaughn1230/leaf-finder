"use client";
import React, { useCallback } from "react";
// import { EmblaOptionsType } from "embla-carousel";
// import { DotButton, useDotButton } from "./CarouselDotButtons.client";

import useEmblaCarousel from "embla-carousel-react";
import { ImageType } from "@/types/types";
import Image from "next/image";

type PropType = {
  images: ImageType[];
};

const Carousel: React.FC<PropType> = (props) => {
  const { images } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    // centered container
    <div className="overflow-hidden w-[80vw] mx-auto mt-12">
      {/* carousel container for library*/}
      <div
        // This one controls image sizing
        //w-[800px] h-[400px]
        className="overflow-hidden w-full h-auto mx-auto aspect-[16/9] relative border-2 border-solid border-pink-300"
        ref={emblaRef}
      >
        {/* Image Carousel Container */}
        <div className="w-full h-full flex border-2 border-solid border-yellow">
          {images.map((image, index) => (
            // image container
            <div
              className="embla__container relative flex flex-[0_0_100%] items-center justify-center h-full w-full overflow-hidden border-2 border-solid border-white"
              key={index}
            >
              {/* image */}
              <Image
                src={image.url}
                alt={image.title}
                layout="fill"
                objectFit="contain"
                className="embla__slide border-2 border-solid border-blue-700" //absolute inset-0
              />
            </div>
          ))}
        </div>

        {/* Scroll Buttons  */}
        <div className="absolute inset-0 flex items-center justify-between border-2 border-solid border-red-500">
          <button
            className="h-full bg-black bg-opacity-50 px-4 py-2 text-white text-sm hover:bg-opacity-70"
            onClick={scrollPrev}
          >
            Prev
          </button>
          <button
            className="h-full bg-black bg-opacity-50 px-4 py-2 text-white text-sm hover:bg-opacity-70"
            onClick={scrollNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
