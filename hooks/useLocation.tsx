"use client";
import { useState } from "react";
import { PositionType } from "@/types/types";

const useLocation = () => {
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [longLat, setlongLat] = useState("");
  const [locationErrorMsg, setLocationErrorMsg] = useState("");

  function success(position: PositionType) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setlongLat(`${longitude},${latitude}`);

    setIsFindingLocation(false);
    setLocationErrorMsg("");
  }

  function error() {
    setIsFindingLocation(false);
    setLocationErrorMsg("Unable to retrieve your location");
    console.error("Unable to retrieve your location");
  }

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      setLocationErrorMsg("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      setIsFindingLocation(true);
      setLocationErrorMsg("");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    longLat,
    isFindingLocation,
    handleTrackLocation,
    locationErrorMsg,
  };
};

export default useLocation;
