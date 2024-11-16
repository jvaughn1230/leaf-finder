"use client";
import { useCallback } from "react";
import Image from "next/image";
import { ImageType } from "@/types/types";
import useEmblaCarousel from "embla-carousel-react";

type Props = { images: ImageType[] };

const NPSImageSlider = (props: Props) => {
  const { images } = props;
  //   passs
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    // embla class
    <div className="overflow-hidden" ref={emblaRef}>
      {/* embla__container */}
      <div className="flex">
        {images.map((image) => (
          // image slide
          <Image
            key={image.url}
            src={image.url}
            alt={image.title}
            height={300}
            width={500}
            className="flex-grow-0 flex-shrink-0 basis-1/3 mx-5 h-80"
          />
        ))}
      </div>
      <button className="embla__prev" onClick={scrollPrev}>
        Prev
      </button>
      <button className="embla__next" onClick={scrollNext}>
        Next
      </button>
    </div>
  );
};

export default NPSImageSlider;
