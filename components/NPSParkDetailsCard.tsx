import React from "react";

type Props = {
  name: string;
  data: string;
  isButton: boolean;
};

const NPSParkDetailsCard = (props: Props) => {
  return (
    <div className="lg:w-1/4 md:w-1/2 ">
      {props.isButton ? (
        <div className="w-full h-full">
          <a
            href={props.data}
            target="_blank"
            className="block w-full h-full text-xl py-2 px-4 text-center bg-black text-white"
          >
            Learn More
          </a>
        </div>
      ) : (
        <>
          <p className="font-bold text-sm pb-1">{props.name.toUpperCase()}</p>
          {props.name === "EMAIL" ? (
            <a href={`mailto:${props.data}`} className="underline">
              {props.data}
            </a>
          ) : (
            <p className="font-normal text-sm">{props.data}</p>
          )}
        </>
      )}
    </div>
  );
};

export default NPSParkDetailsCard;
