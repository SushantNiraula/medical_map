"use client";

import React, { useState } from "react";
import Map from "./gmap";
import FamousPlaces from "./places";
import Container from "./container";
interface MarkerData {
  name: string;
  description: string;
}
const LocationDetails = () => {
  const [selectedPlace, setSelectedPlace] = useState<MarkerData | null>(null);
  return (
    <Container className="h-screen flex flex-col">
      <div className="flex-grow flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 h-1/2 md:h-full min-h-[300px]">
          <Map onMarkerClick={setSelectedPlace} />
        </div>
        <div className="w-full md:w-1/3 h-1/2 md:h-full bg-gray-100">
          <FamousPlaces selectedPlace={selectedPlace} />
        </div>
      </div>
    </Container>
  );
};

export default LocationDetails;